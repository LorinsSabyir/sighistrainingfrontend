import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthLayoutService {
  private readonly accessTokenKey = 'accessToken';

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const isAccepted =
      credentials.email === 'clinician@hospital.test' &&
      credentials.password === 'Password123!';

    if (!isAccepted) {
      return throwError(() => new Error('Invalid email or password. Please try again.')).pipe(
        delay(700),
      );
    }

    return of({
      accessToken: 'dummy-jwt-token-replace-with-real-api-token',
      user: {
        email: credentials.email,
        name: 'Clinical User',
      },
    }).pipe(delay(700));
  }

  saveAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  clearSession(): void {
    localStorage.removeItem(this.accessTokenKey);
  }
}
