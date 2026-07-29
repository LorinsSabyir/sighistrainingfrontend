import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

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
  private readonly logoutApiUrl = 'http://127.0.0.1:8000/api/logout';

  private readonly accessTokenKey = 'accessToken';
  private readonly USER_KEY = 'currentUser';

  private readonly router = inject(Router);

  authState = signal({
    user: null as LoginResponse['user'] | null,
    isLoading: false,
    isAuthenticated: false,
  });

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
      tap((response) => {
        this.saveAccessToken(response.accessToken);
        this.saveUser(response.user);

        this.authState.set({
          user: response.user,
          isLoading: false,
          isAuthenticated: true,
        });
      }),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          return throwError(() => new Error(this.getLoginErrorMessage(error)));
        }

        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    try {
      this.http.post(this.logoutApiUrl, {}).subscribe({
        next: () => this.clearLocalSession(),
        error: () => this.clearLocalSession(),
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  saveAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  saveUser(user: LoginResponse['user']): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): LoginResponse['user'] | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  private clearLocalSession(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.USER_KEY);

    this.authState.set({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });

    void this.router.navigate(['/login']);
  }

  private getLoginErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 401 || error.status === 422) {
      return 'Invalid email or password. Please try again.';
    }

    if (error.status === 0) {
      return 'Unable to reach the server. Please check if the Laravel API is running.';
    }

    return 'Login failed. Please try again.';
  }
}