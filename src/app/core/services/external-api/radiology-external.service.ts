import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Radiology {
  code?: string;
  test?: string;
  group_code?: string;
  group?: string;
  section_code?: string;
  section?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RadiologyService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/seg/radiology';

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /api/seg/Radiology
   */
  getRadiologys(): Observable<Radiology[]> {
    return this.http.get<Radiology[]>(this.apiUrl);
  }

  /**
   * GET /api/seg/Radiology/{id}
   */
  getRadiology(id: string): Observable<Radiology> {
    return this.http.get<Radiology>(`${this.apiUrl}/${id}`);
  }
}
