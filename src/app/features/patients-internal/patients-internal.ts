import { Component, OnInit, signal } from '@angular/core';
import { Patient, PatientsExternalApiService } from '../../core/services/patients-external-api.service';
import { Table, TableColumn } from '../../shared/table/table';

@Component({
  selector: 'app-patients-internal',
  imports: [Table],
  templateUrl: './patients-internal.html',
  styleUrl: './patients-internal.css',
})
export class PatientsInternal implements OnInit {
  readonly patients = signal<Patient[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly patientService: PatientsExternalApiService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.patients.set(patients);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load patients.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  columns: TableColumn[] = [

    {
      header: 'Patient ID',
      field: 'pid',
      class: 'id_badge'
    },

    {
      header: 'Last Name',
      field: 'name_last'
    },

    {
      header: 'First Name',
      field: 'name_first'
    },

    {
      header: 'Middle Name',
      field: 'name_middle'
    },

    {
      header: 'Age',
      field: 'age',
      align: 'center'
    },

    {
      header: 'Sex',
      field: 'sex',
      class: 'badge',
      align: 'center'
    },

    {
      header: 'City',
      field: 'City'
    }

  ];
}
