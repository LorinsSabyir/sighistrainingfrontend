import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '../../../../shared/button/button';
import { AuthLayoutService } from '../../../auth-layout/auth-layout.service';

interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  roles?: ('admin' | 'doctor' | 'nurse')[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Button],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(public authService: AuthLayoutService) {}

  protected readonly navigationItems: NavigationItem[] = [
    // Everyone
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'D',
    },

    // Admin + Nurse
    {
      label: 'Patients Internal',
      route: '/patients internal',
      icon: 'PI',
      roles: ['admin', 'nurse'],
    },

    // Everyone
    {
      label: 'Patients External',
      route: '/patients',
      icon: 'PE',
    },

    // Admin + Doctor + Nurse
    {
      label: 'Encounters',
      route: '/appointments',
      icon: 'E',
      roles: ['admin', 'doctor', 'nurse'],
    },

    // Everyone can view
    {
      label: 'Laboratory',
      route: '/laboratory',
      icon: 'L',
      roles: ['admin', 'doctor', 'nurse'],
    },

    {
      label: 'Radiology',
      route: '/radiology',
      icon: 'R',
      roles: ['admin', 'doctor', 'nurse'],
    },

    {
      label: 'Ward',
      route: '/ward',
      icon: 'W',
      roles: ['admin', 'doctor', 'nurse'],
    },

    {
      label: 'Department',
      route: '/department',
      icon: 'D',
      roles: ['admin', 'doctor', 'nurse'],
    },

    // Admin only
    {
      label: 'Doctors',
      route: '/doctor',
      icon: 'D',
      roles: ['admin'],
    },

    {
      label: 'Nurse',
      route: '/nurse',
      icon: 'N',
      roles: ['admin'],
    },
  ];

  hasAccess(item: NavigationItem): boolean {
    if (!item.roles) {
      return true;
    }

    return this.authService.hasRole(...item.roles);
  }

  logout(): void {
    this.authService.logout();
  }
}
