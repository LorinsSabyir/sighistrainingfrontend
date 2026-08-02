import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  personnel_id?: string;
  name_first: string;
  name_last: string;
  name_middle?: string;
  name_suffix?: string;
  role: 'admin' | 'nurse' | 'doctor';
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly userUrl = 'http://127.0.0.1:8000/api/user';
  private readonly adminUrl = 'http://127.0.0.1:8000/api/admin';

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /api/user/show/{id}
   */
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/show/${id}`);
  }

  /**
   * PUT /api/user/update/{id}
   */
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/update/${id}`, user);
  }

  /**
   * GET /api/user/nurse
   */
  getAllNurses(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/nurse`);
  }

  /**
   * GET /api/user/doctors
   */
  getAllDoctors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/doctors`);
  }

  /**
   * GET /api/admin
   * Admin only.
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.adminUrl);
  }

  /**
   * POST /api/admin/store
   * Admin only.
   */
  storeUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.adminUrl}/store`, user);
  }

  /**
   * DELETE /api/admin/delete/{id}
   * Admin only.
   */
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.adminUrl}/delete/${id}`);
  }
}