import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// patient.model.ts
export interface Patient {
  pid?: string;
  date_registered?: string;
  name_first: string;
  name_last: string;
  name_middle?: string;
  name_suffix?: string;
  phone_number?: string;
  blood_group?: string;
  date_of_birth?: string;
  sex: string;
  age?: string;
  civil_status?: string;
  place_of_birth?: string;
  religion?: string;
  ethnicity?: string;
  address_street?: string;
  address_brgy?: string;
  address_city?: string;
  address_province?: string;
  address_country?: string;
  address_zipcode?: string;
  patient_mother_name?: string;
  patient_father_name?: string;
  patient_guardian_name?: string;
  patient_guardian_relationship?: string;
  patient_spouse_name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PatientsExternalApiService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/seg/patient';

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /api/seg/patient
   */
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  /**
   * GET /api/seg/patient/{id}
   */
  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  /**
   * GET /api/seg/patient/{id}
   */
  getPatientsById(id: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * GET /api/seg/patient/name/{lastName}/{firstName}
   */
  searchPatient(
    lastName: string,
    firstName: string
  ): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      `${this.apiUrl}/name/${encodeURIComponent(lastName)}/${encodeURIComponent(firstName)}`
    );
  }
}
