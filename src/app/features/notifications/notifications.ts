import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationsService,
  NotificationsFields,
} from '../../core/services/notifications.service';
import { NotificationCard } from '../../shared/notification-card/notification-card';

@Component({
  selector: 'app-notifications',
  imports: [NotificationCard],
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
        this.notifications.update((list) =>
          list.map((n) => (n.id === notification.id ? { ...n, is_read: true } : n)),
        );

        if (notification.action_url?.trim()) {
          this.router.navigateByUrl(notification.action_url);
        }
      },
      error: (err) => {
        console.error(err);

        if (notification.action_url?.trim()) {
          this.router.navigateByUrl(notification.action_url);
        }
      },
    });
  }
}