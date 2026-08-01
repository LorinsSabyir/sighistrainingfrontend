import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Doctor {
  personnel_id?: string;
  pid?: string;
  dateRegistered?: string;
  name_last?: string;
  name_first?: string;
  name_middle?: string;
  Street?: string;
  City?: string;
  Province?: string;
  Country?: string;
  ZipCode?: string;
  date_birth?: string;
  sex?: string;
  location_nr?: string;
  deptid?: string;
  name_formal?: string;
  name_short?: string;
  license_nr?: string;
  prescription_license_nr?: string;
  tin?: string;
  ptr_nr?: string;
  s2_nr?: string;
  login_id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/seg/doctor';

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /api/seg/Doctor
   */
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  /**
   * GET /api/seg/Doctor/{id}
   */
  getDoctor(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }
}
