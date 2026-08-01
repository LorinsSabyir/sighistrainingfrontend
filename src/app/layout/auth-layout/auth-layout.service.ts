import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  personnel_id: string;

  name_first: string;
  name_last: string;

  email: string;

  role: 'admin' | 'doctor' | 'nurse';
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

interface ApiLoginResponse {
  accessToken?: string;
  token?: string;
  user?: AuthUser;
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
    user: this.getUser(),
    isLoading: false,
    isAuthenticated: !!this.getAccessToken(),
  });

  constructor(private readonly http: HttpClient) {}

  // =====================================================
  // Authentication
  // =====================================================

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<ApiLoginResponse>(this.loginApiUrl, credentials).pipe(
      map((response) => {
        const accessToken = response.accessToken ?? response.token;

        if (!accessToken) {
          throw new Error('Login response did not include an access token.');
        }

        if (!response.user) {
          throw new Error('Login response did not include user information.');
        }

        return {
          accessToken,
          user: response.user,
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
      })
    );
  }

  logout(): void {
    this.http.post(this.logoutApiUrl, {}).subscribe({
      next: () => this.clearLocalSession(),
      error: () => this.clearLocalSession(),
    });
  }

  // =====================================================
  // Token
  // =====================================================

  saveAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  // =====================================================
  // User
  // =====================================================

  saveUser(user: AuthUser): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): AuthUser | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? (JSON.parse(user) as AuthUser) : null;
  }

  getFullName(): string {
    const user = this.getUser();

    if (!user) return '';

    return `${user.name_first} ${user.name_last}`;
  }

  // =====================================================
  // Role Helpers
  // =====================================================

  getRole(): AuthUser['role'] | null {
    return this.getUser()?.role ?? null;
  }

  hasRole(...roles: AuthUser['role'][]): boolean {
    const role = this.getRole();

    return role !== null && roles.includes(role);
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isDoctor(): boolean {
    return this.getRole() === 'doctor';
  }

  isNurse(): boolean {
    return this.getRole() === 'nurse';
  }

  // =====================================================
  // Session
  // =====================================================

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

  // =====================================================
  // Errors
  // =====================================================

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