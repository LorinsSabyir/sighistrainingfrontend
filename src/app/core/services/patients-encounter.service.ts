import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PatientEncounter {
  id?: number;
  case_nr?: string;
  encounter_date?: string;
  patient_type: string;
  official_receipt_nr?: string;
  admitting_diagnosis?: string;
  chief_complaint?: string;
  is_confidential?: boolean;
  discharge_datetime?: string;
  iswaitlisted?: boolean;
  is_still_in?: boolean;
  consultation_date?: string;
  consultation_time?: string;
  time_of_arrival?: string;
  patient_id: number;
  ward_id?: number | null;
  nurse_id?: number | null;
  doctor_id?: number | null;
  patient?: any;
  ward?: any;
  nurse?: any;
  doctor?: any;
}

@Injectable({
  providedIn: 'root',
})
export class PatientsEncounterService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/patient_encounter';

  constructor(private readonly http: HttpClient) {}

  getEncounters(): Observable<PatientEncounter[]> {
    return this.http.get<PatientEncounter[]>(this.apiUrl);
  }

  getEncounterById(id: number): Observable<PatientEncounter> {
    return this.http.get<PatientEncounter>(`${this.apiUrl}/show/${id}`);
  }

  getEncountersByPatient(patientId: number): Observable<PatientEncounter[]> {
    return this.http.get<PatientEncounter[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  storeEncounter(encounter: PatientEncounter): Observable<PatientEncounter> {
    return this.http.post<PatientEncounter>(`${this.apiUrl}/store`, encounter);
  }

  updateEncounter(id: number, encounter: Partial<PatientEncounter>): Observable<PatientEncounter> {
    return this.http.put<PatientEncounter>(`${this.apiUrl}/update/${id}`, encounter);
  }

  deleteEncounter(id: number): Observable<PatientEncounter> {
    return this.http.delete<PatientEncounter>(`${this.apiUrl}/delete/${id}`);
  }

  searchEncounter(query: string): Observable<PatientEncounter[]> {
    return this.http.get<PatientEncounter[]>(
      `${this.apiUrl}/search?q=${encodeURIComponent(query)}`,
    );
  }
}
