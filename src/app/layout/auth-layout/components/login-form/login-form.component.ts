import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Input() username: string = '';
  @Input() password: string = '';
  @Input() usernameError: string = '';
  @Input() passwordError: string = '';
  @Input() loginError: string = '';
  @Input() isLoading: boolean = false;
  @Input() showPassword: boolean = false;
  @Input() rememberMe: boolean = false;

  @Output() usernameChange = new EventEmitter<string>();
  @Output() passwordChange = new EventEmitter<string>();
  @Output() rememberMeChange = new EventEmitter<boolean>();
  @Output() login = new EventEmitter<void>();
  @Output() showRegister = new EventEmitter<void>();
  @Output() togglePasswordVisibility = new EventEmitter<void>();

  onUsernameChange(value: string) {
    this.usernameChange.emit(value);
  }

  onPasswordChange(value: string) {
    this.passwordChange.emit(value);
  }

  onLogin() {
    this.login.emit();
  }

  onShowRegister() {
    this.showRegister.emit();
  }

  onTogglePasswordVisibility() {
    this.togglePasswordVisibility.emit();
  }
}
