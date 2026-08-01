import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn, TableCellDef } from '../../shared/table/table';
import {
  PatientEncounter,
  PatientsEncounterService,
} from '../../core/services/patients-encounter.service';
import { FormFieldConfig, ModalForm } from '../../shared/modal-form/modal-form';
import { Button } from '../../shared/button/button';
import { SearchBar } from '../../shared/search-bar/search-bar';

@Component({
  selector: 'app-appointments',
  imports: [Table, ModalForm, Button, TableCellDef, SearchBar],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class Appointments implements OnInit {
  readonly encounters = signal<PatientEncounter[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly encounterService: PatientsEncounterService) {}

  ngOnInit(): void {
    this.loadEncounters();
  }

  loadEncounters(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.encounterService.getEncounters().subscribe({
      next: (encounters) => {
        this.encounters.set(encounters);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load encounters.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  onCreateEncounter(formData: PatientEncounter) {
    this.encounterService.storeEncounter(formData).subscribe({
      next: (newEncounter) => {
        this.encounters.update((list) => [...list, newEncounter]);
        this.isModalOpen.set(false);
      },
      error: (err) => console.error('Create failed:', err),
    });
  }

  onUpdateEncounter(id: number, formData: Partial<PatientEncounter>) {
    this.encounterService.updateEncounter(id, formData).subscribe({
      next: (updatedEncounter) => {
        this.encounters.update((list) =>
          list.map((e) => (e.id === updatedEncounter.id ? updatedEncounter : e)),
        );

        this.isModalOpen.set(false);
      },
      error: (err) => console.error('Update failed:', err),
    });
  }

  onDeleteEncounter(encounter: PatientEncounter): void {
    this.encounterService.deleteEncounter(encounter.id!).subscribe({
      next: () => {
        this.encounters.update((list) => list.filter((e) => e.id !== encounter.id));
      },
      error: (err) => console.error('Delete failed:', err),
    });
  }

  // ---------- Table ----------

  columns: TableColumn[] = [
    {
      header: 'Case No.',
      field: 'case_nr',
      class: 'id_badge',  
    },
    {
      header: 'Encounter Date',
      field: 'encounter_date',
    },
    {
      header: 'Patient Type',
      field: 'patient_type',
    },
    {
      header: 'Chief Complaint',
      field: 'chief_complaint',
    },
    {
      header: 'Diagnosis',
      field: 'admitting_diagnosis',
    },
    {
      header: 'Patient ID',
      field: 'patient_id',
      class: 'id_badge',
      align: 'center',
    },
    {
      header: 'Ward',
      field: 'ward_id',
      align: 'center',
    },
    {
      header: 'Actions',
      field: 'actions',
      align: 'right',
    },
  ];

  // ---------- Modal ----------

  isModalOpen = signal(false);
  editingEncounter = signal<PatientEncounter | null>(null);

  encounterFields: FormFieldConfig[] = [
    {
      key: 'ward_id',
      label: 'Ward',
      type: 'number',
    },
    {
      key: 'patient_type',
      label: 'Patient Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Outpatient', value: 'Outpatient' },
        { label: 'Inpatient', value: 'Inpatient' },
        { label: 'Emergency', value: 'Emergency' },
      ],
    },
    {
      key: 'encounter_date',
      label: 'Encounter Date',
      type: 'date',
    },
    {
      key: 'official_receipt_nr',
      label: 'Official Receipt No.',
    },
    {
      key: 'chief_complaint',
      label: 'Chief Complaint',
      type: 'textarea',
    },
    {
      key: 'admitting_diagnosis',
      label: 'Admitting Diagnosis',
      type: 'textarea',
    },
    {
      key: 'consultation_date',
      label: 'Consultation Date',
      type: 'date',
    },
    {
      key: 'consultation_time',
      label: 'Consultation Time',
      type: 'time',
    },
    {
      key: 'time_of_arrival',
      label: 'Time of Arrival',
      type: 'time',
    },
    {
      key: 'discharge_datetime',
      label: 'Discharge Date/Time',
      type: 'date',
    },
  ];

  openEditModal(encounter: PatientEncounter): void {
    this.editingEncounter.set(encounter);
    this.isModalOpen.set(true);
  }

  onModalSubmit(formValue: Record<string, any>): void {
    const editing = this.editingEncounter();

    if (editing) {
      this.onUpdateEncounter(editing.id!, formValue);
    } else {
      this.onCreateEncounter(formValue as PatientEncounter);
    }
  }

  // ---------- Search Bar ----------
  onSearch(query: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.encounterService.searchEncounter(query).subscribe({
      next: (encounters) => {
        this.encounters.set(encounters);
        this.isLoading.set(false);
      },

      error: (err) => {
        this.error.set('Search failed.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }
}
