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
export class PatientsInternalService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/patient';

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /api/seg/patient
   */
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }
  
  /**
   * GET /api/patient/{id}
   */
  getPatientsById(id: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * GET /api/patient/{pid}
   */
  getPatientByPid(pid: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${pid}`);
  }

  /**
   * GET /api/patient/name/{lastName}/{firstName}
   */
  searchPatient(
    lastName: string,
    firstName: string
  ): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      `${this.apiUrl}/name/${encodeURIComponent(lastName)}/${encodeURIComponent(firstName)}`
    );
  }

  /**
   * Create a new patient.
   * Maps to: POST /store
   */
  storePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/store`, patient);
  }

  /**
   * Update an existing patient.
   * Maps to: PUT /update/{pid}
   */
  updatePatient(pid: string, patient: Partial<Patient>): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/update/${pid}`, patient);
  }

  
  
}
