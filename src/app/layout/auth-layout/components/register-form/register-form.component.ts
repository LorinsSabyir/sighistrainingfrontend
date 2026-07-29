import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface RegistrationData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationErrors {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  password: string;
  confirmPassword: string;
  general: string;
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  @Input() formData: RegistrationData = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    password: '',
    confirmPassword: ''
  };

  @Input() errors: RegistrationErrors = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    password: '',
    confirmPassword: '',
    general: ''
  };

  @Input() isRegistering: boolean = false;
  @Input() showPassword: boolean = false;
  @Input() showConfirmPassword: boolean = false;

  @Output() formDataChange = new EventEmitter<RegistrationData>();
  @Output() register = new EventEmitter<void>();
  @Output() showLogin = new EventEmitter<void>();
  @Output() togglePasswordVisibility = new EventEmitter<void>();
  @Output() toggleConfirmPasswordVisibility = new EventEmitter<void>();

  departments = [
    { value: 'admin', label: 'Administration' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'it', label: 'IT Department' }
  ];

  onFieldChange(field: keyof RegistrationData, value: string) {
    this.formData = { ...this.formData, [field]: value };
    this.formDataChange.emit(this.formData);
  }

  onRegister() {
    this.register.emit();
  }

  onShowLogin() {
    this.showLogin.emit();
  }

  onTogglePasswordVisibility() {
    this.togglePasswordVisibility.emit();
  }

  onToggleConfirmPasswordVisibility() {
    this.toggleConfirmPasswordVisibility.emit();
  }
}
