import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface NotificationsFields {
  id?: number;
  created_at?: string;
  updated_at?: string;
  title: string;
  message?: string;
  category?: string;
  priority?: string;
  action_url?: string;
  action_type?: string;
  is_read?: boolean;
  expires_at?: string;

  action_id?: number | null;
  sender_id?: number | null;
  receiver_id?: number | null;
  action?: any;
  sender?: any;
  receiver?: any;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/notification';

  constructor(private readonly http: HttpClient) {}

  getNotifications(): Observable<NotificationsFields[]> {
    return this.http.get<NotificationsFields[]>(this.apiUrl);
  }

  getNotificationById(id: number): Observable<NotificationsFields> {
    return this.http.get<NotificationsFields>(`${this.apiUrl}/show/${id}`);
  }

  storeNotification(notification: NotificationsFields): Observable<NotificationsFields> {
    return this.http.post<NotificationsFields>(`${this.apiUrl}/store`, notification);
  }

  updateNotification(
    id: number,
    notification: Partial<NotificationsFields>,
  ): Observable<NotificationsFields> {
    return this.http.put<NotificationsFields>(`${this.apiUrl}/update/${id}`, notification);
  }

  deleteNotification(id: number): Observable<NotificationsFields> {
    return this.http.delete<NotificationsFields>(`${this.apiUrl}/delete/${id}`);
  }

  markAsRead(id: number) {
    return this.http.patch(`${this.apiUrl}/${id}`, {});
  }
}
