import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-sidebar.component.html',
})
export class AuthSidebarComponent {
  @Input() logoUrl: string = '';

  features = [
    { name: 'Justifications', icon: 'circle' },
    { name: 'PTLOS', icon: 'circle' },
    { name: 'Pass Slip', icon: 'circle' }
  ];
}
