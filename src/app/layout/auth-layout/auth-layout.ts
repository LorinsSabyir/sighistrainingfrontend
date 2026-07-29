import { Component } from '@angular/core';
import { AuthBrand } from './components/auth-brand/auth-brand';
import { LoginForm } from './components/login-form/login-form';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthBrand, LoginForm],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
