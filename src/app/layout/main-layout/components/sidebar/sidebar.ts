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
    { label: 'Reports', route: '/reports', icon: 'R' },
    { label: 'Billing', route: '/billing', icon: 'B' },
  ];

  constructor(private authService: AuthLayoutService) {}

  logout(): void {
    this.authService.logout();
  }

}
