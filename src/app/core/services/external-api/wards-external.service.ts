import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Ward {
  ward_id?: string;
  description?: string;
  dept_nr?: string;

}

@Injectable({
  providedIn: 'root',
})
export class WardsService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/seg/ward';

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /api/seg/Ward
   */
  getWards(): Observable<Ward[]> {
    return this.http.get<Ward[]>(this.apiUrl);
  }

  /**
   * GET /api/seg/Ward/{id}
   */
  getWard(id: string): Observable<Ward> {
    return this.http.get<Ward>(`${this.apiUrl}/${id}`);
  }
}
