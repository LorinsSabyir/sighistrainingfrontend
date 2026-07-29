import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly navigationItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'D' },
    { label: 'Patients', route: '/patients', icon: 'P' },
    { label: 'Appointments', route: '/appointments', icon: 'A' },
    { label: 'Reports', route: '/reports', icon: 'R' },
    { label: 'Billing', route: '/billing', icon: 'B' },
  ];
}
