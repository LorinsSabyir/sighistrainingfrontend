import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-input.component.html',
})
export class PasswordInputComponent {
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() error: string = '';
  @Input() showPassword: boolean = false;
  @Input() label: string = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() toggleVisibility = new EventEmitter<void>();

  onValueChange(newValue: string) {
    this.valueChange.emit(newValue);
  }

  onToggleVisibility() {
    this.toggleVisibility.emit();
  }
}
