import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Button } from "../../../../shared/button/button";
import { AuthLayoutService } from '../../../auth-layout/auth-layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Button],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  private readonly router = inject(Router);
  
  protected readonly navigationItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'D' },
    { label: 'Patients', route: '/patients', icon: 'P' },
    { label: 'Appointments', route: '/appointments', icon: 'A' },
    { label: 'Reports', route: '/reports', icon: 'R' },
    { label: 'Billing', route: '/billing', icon: 'B' },
  ];

  constructor(private authService: AuthLayoutService) {}

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/dashboard']);
  }

}
