import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayoutService } from './layout/auth-layout/auth-layout.service';
import { Appointments } from './features/appointments/appointments';
import { Dashboard } from './features/dashboard/dashboard';
import { Patients } from './features/patients/patients';
import { NotFound } from './features/not-found/not-found';
import { PatientsInternal } from './features/patients-internal/patients-internal';
import { Notifications } from './features/notifications/notifications';
import { Laboratory } from './features/laboratory/laboratory';
import { Radiology } from './features/radiology/radiology';
import { Ward } from './features/ward/ward';
import { Department } from './features/department/department';
import { Doctor } from './features/doctor/doctor';
import { Nurse } from './features/nurse/nurse';

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
        path: 'notifications',
        component: Notifications,
      },
      {
        path: 'laboratory',
        component: Laboratory,
      },
      {
        path: 'radiology',
        component: Radiology,
      },
      {
        path: 'ward',
        component: Ward,
      },
      {
        path: 'department',
        component: Department,
      },
      {
        path: 'doctor',
        component: Doctor,
      },
      {
        path: 'nurse',
        component: Nurse,
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
