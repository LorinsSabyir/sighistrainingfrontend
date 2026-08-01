import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Department {
  deptnr?: string;
  deptid?: string;
  dept_name?: string;
  dept_shortname?: string;
  parent_dept_nr?: string;
  parent_name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/seg/department';

  constructor(private readonly http: HttpClient) {}

  /**
   * GET /api/seg/Department
   */
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  /**
   * GET /api/seg/Department/{id}
   */
  getDepartment(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }
}
