import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
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
      token: 'dummy-jwt-token-replace-with-real-api-token',
      user: {
        email: credentials.email,
        name: 'Clinical User',
      },
    }).pipe(delay(700));
  }
}
