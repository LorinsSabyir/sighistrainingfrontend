import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from "../../../../shared/button/button";
import { AuthLayoutService } from '../../../auth-layout/auth-layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Button],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly navigationItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'D' },
    { label: 'Patients Internal', route: '/patients internal', icon: 'PI' },
    { label: 'Patients External', route: '/patients', icon: 'PE' },
    { label: 'Encounters', route: '/appointments', icon: 'E' },
    
    { label: 'Laboratory', route: '/laboratory', icon: 'L' },
    { label: 'Radiology', route: '/radiology', icon: 'R' },
    { label: 'Ward', route: '/ward', icon: 'W' },
    { label: 'Department', route: '/department', icon: 'D' },

    { label: 'Doctors', route: '/doctor', icon: 'D' },
    { label: 'Nurse', route: '/nurse', icon: 'N' },
  ];

  constructor(private authService: AuthLayoutService) {}

  logout(): void {
    this.authService.logout();
  }

}
