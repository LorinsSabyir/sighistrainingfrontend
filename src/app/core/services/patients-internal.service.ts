import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Patient {
  pid: string;
  dateRegistered: string;

  name_last: string;
  name_first: string;
  name_middle: string;

  date_birth: string;
  age: string;
  sex: string;
  civil_status: string;

  place_birth: string;

  Street1: string;
  Barangay: string;
  City: string;
  Province: string;
  Country: string;
  ZipCode: string;

  ethnic: string;
  religion: string;

  MotherOfPatient: string | null;
  FatherOfPatient: string | null;
  SpouseOfPatient: string | null;

  deathdate: string;

  brgy_code: string;
  brgy_code_10: string | null;

  municity_code: string;
  municity_code_10: string | null;

  province_code: string;
  province_code_10: string | null;

  region_code: string;
  region_code_10: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class PatientsInternalService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/patient/';

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
  getPatientsByDepartment(id: number): Observable<Patient[]> {
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
