import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsFields } from '../../core/services/notifications.service';

@Component({
  selector: 'app-notification-card',
  imports: [CommonModule],
  templateUrl: './notification-card.html',
  styleUrl: './notification-card.css',
})
export class NotificationCard {

  notification = input.required<NotificationsFields>();

  clicked = output<NotificationsFields>();

  onClick() {
    this.clicked.emit(this.notification());
  }

  priorityColor(priority?: string): string {
    switch ((priority ?? '').toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-700';

      case 'high':
        return 'bg-orange-100 text-orange-700';

      case 'medium':
        return 'bg-yellow-100 text-yellow-700';

      case 'low':
        return 'bg-green-100 text-green-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  icon(category?: string): string {
    switch ((category ?? '').toLowerCase()) {
      case 'patient':
        return '👤';

      case 'appointment':
        return '📅';

      case 'encounter':
        return '🩺';

      case 'billing':
        return '💳';

      case 'report':
        return '📄';

      case 'warning':
        return '⚠️';

      default:
        return '🔔';
    }
  }
}