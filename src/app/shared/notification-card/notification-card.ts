import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsFields } from '../../core/services/notifications.service';

@Component({
  selector: 'app-notification-card',
  imports: [],
  templateUrl: './notification-card.html',
  styleUrl: './notification-card.css',
})
export class NotificationCard {
  @Input({ required: true }) notification!: NotificationsFields;
  @Output() clicked = new EventEmitter<NotificationsFields>();

  private priorityClasses: Record<string, string> = {
    urgent: 'border-l-[var(--color-danger)]',
    high: 'border-l-[var(--color-warning)]',
    normal: 'border-l-[var(--color-info)]',
    low: 'border-l-[var(--color-secondary)]',
  };

  get accentClass(): string {
    return this.priorityClasses[this.notification.priority ?? 'normal'] ?? this.priorityClasses['normal'];
  }

  get senderName(): string {
    const sender = this.notification.sender;
    if (!sender) return 'System';
    return `${sender.name_first ?? ''} ${sender.name_last ?? ''}`.trim();
  }

  get formattedTime(): string {
    if (!this.notification.created_at) return '';
    const date = new Date(this.notification.created_at);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  onClick(): void {
    this.clicked.emit(this.notification);
  }
}