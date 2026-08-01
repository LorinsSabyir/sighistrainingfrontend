import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Laboratory {
  code?: string;
  test?: string;
  section_code?: string;
  section?: string;
  opd?: string;
  ipd?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LaboratoryService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/seg/laboratory';

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /api/seg/Laboratory
   */
  getLaboratories(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(this.apiUrl);
  }

  /**
   * GET /api/seg/Laboratory/{id}
   */
  getLaboratory(id: string): Observable<Laboratory> {
    return this.http.get<Laboratory>(`${this.apiUrl}/${id}`);
  }
}
