import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    name?: string;
  };
}

interface ApiLoginResponse {
  accessToken?: string;
  token?: string;
  user?: {
    email?: string;
    name?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthLayoutService {
  private readonly loginApiUrl = 'http://127.0.0.1:8000/api/login';
  private readonly accessTokenKey = 'accessToken';

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<ApiLoginResponse>(this.loginApiUrl, credentials).pipe(
      map((response) => {
        const accessToken = response.accessToken ?? response.token;

        if (!accessToken) {
          throw new Error('Login response did not include an access token.');
        }

        return {
          accessToken,
          user: {
            email: response.user?.email ?? credentials.email,
            name: response.user?.name,
          },
        };
      }),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          return throwError(() => new Error(this.getLoginErrorMessage(error)));
        }

        return throwError(() => error);
      }),
    );
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

  private getLoginErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 401 || error.status === 422) {
      return 'Invalid email or password. Please try again.';
    }

    if (error.status === 0) {
      return 'Unable to reach the login API. Please check if the server is running.';
    }

    return 'Login failed. Please try again.';
  }
}
