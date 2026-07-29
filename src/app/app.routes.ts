import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayoutService } from './layout/auth-layout/auth-layout.service';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [
      () => {
        const router = inject(Router);
        const authService = inject(AuthLayoutService);
        const token = authService.getAccessToken();

        if (token) {
          return true;
        }

        void router.navigate(['/login']);
        return false;
      },
    ],
    children: [
      // TODO: Add child routes here
    ],
  },
];
