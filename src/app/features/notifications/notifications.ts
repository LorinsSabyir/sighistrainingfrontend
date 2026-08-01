import { Component, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {
  NotificationsService,
  NotificationsFields,
} from '../../core/services/notifications.service';
import { NotificationCard } from '../../shared/notification-card/notification-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [MatListModule, NotificationCard],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {
  readonly notifications = signal<NotificationsFields[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.notificationsService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications.set(notifications);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load notifications.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  openNotification(notification: NotificationsFields): void {
    if (!notification.id) {
      return;
    }

    this.notificationsService.markAsRead(notification.id).subscribe({
      next: () => {
        notification.is_read = true;

        if (notification.action_url?.trim()) {
          this.router.navigateByUrl(notification.action_url);
        }
      },
      error: (err) => {
        console.error(err);

        // Navigate anyway if marking as read fails
        if (notification.action_url?.trim()) {
          this.router.navigateByUrl(notification.action_url);
        }
      },
    });
  }
}
