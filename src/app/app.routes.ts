import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayoutService } from './layout/auth-layout/auth-layout.service';

import { roleGuard } from './guards/role-guard';

import { Dashboard } from './features/dashboard/dashboard';
import { Patients } from './features/patients/patients';
import { PatientsInternal } from './features/patients-internal/patients-internal';
import { Appointments } from './features/appointments/appointments';
import { Notifications } from './features/notifications/notifications';

import { Laboratory } from './features/laboratory/laboratory';
import { Radiology } from './features/radiology/radiology';
import { Ward } from './features/ward/ward';
import { Department } from './features/department/department';

import { Doctor } from './features/doctor/doctor';
import { Nurse } from './features/nurse/nurse';

import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
  // =====================================================
  // Authentication
  // =====================================================

  {
    path: 'login',
    component: AuthLayout,
  },

  // =====================================================
  // Protected Pages
  // =====================================================

  {
    path: '',
    component: MainLayout,
    canActivate: [
      () => {
        const router = inject(Router);
        const authService = inject(AuthLayoutService);

        if (authService.getAccessToken()) {
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

      // ==========================================
      // Everyone
      // ==========================================

      {
        path: 'dashboard',
        component: Dashboard,
      },

      {
        path: 'patients',
        component: Patients,
      },

      {
        path: 'notifications',
        component: Notifications,
      },

      // ==========================================
      // Admin + Nurse
      // ==========================================

      {
        path: 'patients internal',
        component: PatientsInternal,
        canActivate: [roleGuard],
        data: {
          roles: ['admin', 'nurse'],
        },
      },

      // ==========================================
      // Admin + Doctor + Nurse
      // ==========================================

      {
        path: 'appointments',
        component: Appointments,
        canActivate: [roleGuard],
        data: {
          roles: ['admin', 'doctor', 'nurse'],
        },
      },

      {
        path: 'laboratory',
        component: Laboratory,
        canActivate: [roleGuard],
        data: {
          roles: ['admin', 'doctor', 'nurse'],
        },
      },

      {
        path: 'radiology',
        component: Radiology,
        canActivate: [roleGuard],
        data: {
          roles: ['admin', 'doctor', 'nurse'],
        },
      },

      {
        path: 'ward',
        component: Ward,
        canActivate: [roleGuard],
        data: {
          roles: ['admin', 'doctor', 'nurse'],
        },
      },

      {
        path: 'department',
        component: Department,
        canActivate: [roleGuard],
        data: {
          roles: ['admin', 'doctor', 'nurse'],
        },
      },

      // ==========================================
      // Admin Only
      // ==========================================

      {
        path: 'doctor',
        component: Doctor,
        canActivate: [roleGuard],
        data: {
          roles: ['admin'],
        },
      },

      {
        path: 'nurse',
        component: Nurse,
        canActivate: [roleGuard],
        data: {
          roles: ['admin'],
        },
      },
    ],
  },

  // =====================================================
  // 404
  // =====================================================

  {
    path: '**',
    component: NotFound,
  },
];