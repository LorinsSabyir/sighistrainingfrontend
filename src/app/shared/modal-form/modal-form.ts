import { Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from "../button/button";

export interface FormFieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'email' | 'tel';
  required?: boolean;
  maxLength?: number;
  options?: { label: string; value: string | number }[];
  placeholder?: string;
}

@Component({
  selector: 'app-modal-form',
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './modal-form.html',
  styleUrl: './modal-form.css',
})
export class ModalForm {
  private fb = inject(FormBuilder);

  isOpen = input.required<boolean>();
  title = input<string>('Form');
  fields = input.required<FormFieldConfig[]>();
  initialValue = input<Record<string, any> | null>(null);
  submitLabel = input<string>('Save');

  closed = output<void>();
  submitted = output<Record<string, any>>();

  form: FormGroup = this.fb.group({});

  constructor() {
    // Rebuild the form whenever the field config or initial value changes.
    effect(() => {
      const fields = this.fields();
      const initial = this.initialValue();
      const group: Record<string, any> = {};

      for (const field of fields) {
        const validators = [];
        if (field.required) validators.push(Validators.required);
        if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));

        group[field.key] = [initial?.[field.key] ?? '', validators];
      }

      this.form = this.fb.group(group);
    });
  }

  onSubmit(): void {
    console.log('Submit clicked');
    console.log('Form valid:', this.form.valid);
    console.log('Errors:', this.form.errors);
    console.log(this.form.value);
  
    if (this.form.invalid) {
      this.form.markAllAsTouched();
  
      console.log(this.form.controls);
  
      return;
    }
  
    console.log('Emitting...');
    this.submitted.emit(this.form.value);
  }

  onClose(): void {
    this.closed.emit();
  }

  hasError(key: string): boolean {
    const control = this.form.get(key);
    return !!control && control.invalid && control.touched;
  }
}
