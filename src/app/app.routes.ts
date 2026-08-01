import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayoutService } from './layout/auth-layout/auth-layout.service';
import { Appointments } from './features/appointments/appointments';
import { Billing } from './features/billing/billing';
import { Dashboard } from './features/dashboard/dashboard';
import { Patients } from './features/patients/patients';
import { Reports } from './features/reports/reports';
import { NotFound } from './features/not-found/not-found';
import { PatientsInternal } from './features/patients-internal/patients-internal';
import { Notifications } from './features/notifications/notifications';

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
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'patients internal',
        component: PatientsInternal,
      },
      {
        path: 'patients',
        component: Patients,
      },
      {
        path: 'appointments',
        component: Appointments,
      },
      {
        path: 'reports',
        component: Reports,
      },
      {
        path: 'billing',
        component: Billing,
      },
      {
        path: 'notifications',
        component: Notifications,
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
