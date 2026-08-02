import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn, TableCellDef } from '../../shared/table/table';
import {
  PatientEncounter,
  PatientsEncounterService,
} from '../../core/services/patients-encounter.service';
import { SearchBar } from "../../shared/search-bar/search-bar";

@Component({
  selector: 'app-doctor-patients',
  imports: [Table, TableCellDef, SearchBar],
  templateUrl: './doctor-patients.html',
  styleUrl: './doctor-patients.css',
})
export class DoctorPatients implements OnInit {
  readonly encounters = signal<PatientEncounter[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly encounterService: PatientsEncounterService) {}

  ngOnInit(): void {
    this.loadMyPatients();
  }

  loadMyPatients(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.encounterService.getMyPatients().subscribe({
      next: (encounters) => {
        this.encounters.set(encounters);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load your patients.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  columns: TableColumn[] = [
    { header: 'Case No.', field: 'case_nr', class: 'id_badge' },
    { header: 'Encounter Date', field: 'encounter_date' },
    { header: 'Patient Type', field: 'patient_type' },
    { header: 'Chief Complaint', field: 'chief_complaint' },
    { header: 'Diagnosis', field: 'admitting_diagnosis' },
    { header: 'Patient ID', field: 'patient_id', align: 'center' },
    { header: 'Ward', field: 'ward_id', align: 'center' },
  ];
}