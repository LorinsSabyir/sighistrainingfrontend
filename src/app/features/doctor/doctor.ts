import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn } from '../../shared/table/table';
import { Doctor as DoctorModel, DoctorsService } from '../../core/services/external-api/doctors-external.service';

@Component({
  selector: 'app-doctor',
  imports: [ Table ],
  templateUrl: './doctor.html',
  styleUrl: './doctor.css',
})
export class Doctor implements OnInit {
  readonly doctors = signal<DoctorModel[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly doctorsService: DoctorsService) {}

  ngOnInit(): void {
    this.loadDoctor();
  }

  loadDoctor(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.doctorsService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors.set(doctors);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load doctors.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  columns: TableColumn[] = [
    {
      header: 'Personnel ID',
      field: 'personnel_nr',
      class: 'id_badge',
    },
    {
      header: 'Last Name',
      field: 'name_last',
    },
    {
      header: 'First Name',
      field: 'name_first',
    },
    {
      header: 'Middle Name',
      field: 'name_middle',
    },
    {
      header: 'Date of Birth',
      field: 'date_birth',
    },
    {
      header: 'Gender',
      field: 'sex',
    },
    {
      header: 'Location Number',
      field: 'location_nr',
    },
    {
      header: 'Department ID',
      field: 'deptid',
    },
    {
      header: 'Formal Name',
      field: 'name_formal',
    },
    {
      header: 'Short Name',
      field: 'name_short',
    },
    {
      header: 'License Number',
      field: 'license_nr',
    },
    {
      header: 'TIN',
      field: 'tin',
    },
    {
      header: 'Ward Area',
      field: 'ward_area',
    },
  ];
}
