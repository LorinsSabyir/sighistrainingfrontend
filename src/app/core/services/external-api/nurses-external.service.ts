import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Nurse {
  personnel_id?: string;
  name_last?: string;
  name_first?: string;
  name_middle?: string;
  date_birth?: string;
  sex?: string;
  location_nr?: string;
  deptid?: string;
  name_formal?: string;
  license_nr?: string;
  tin?: string;
  login_id?: string;
  ward_area?: string;
  all_ward?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NursesService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/seg/nurse';

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /api/seg/Nurse
   */
  getNurses(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(this.apiUrl);
  }

  /**
   * GET /api/seg/Nurse/{id}
   */
  getNurse(id: string): Observable<Nurse> {
    return this.http.get<Nurse>(`${this.apiUrl}/${id}`);
  }
}
