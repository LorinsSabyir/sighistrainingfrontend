import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn, TableCellDef } from '../../shared/table/table';
import { Patient, PatientsInternalService } from '../../core/services/patients-internal.service';
import { UsersService, User } from '../../core/services/users.service';
import { FormFieldConfig, ModalForm } from '../../shared/modal-form/modal-form';
import { Button } from '../../shared/button/button';
import { SearchBar } from '../../shared/search-bar/search-bar';
import {
  PatientEncounter,
  PatientsEncounterService,
} from '../../core/services/patients-encounter.service';

@Component({
  selector: 'app-patients-internal',
  imports: [Table, ModalForm, Button, SearchBar, TableCellDef],
  templateUrl: './patients-internal.html',
  styleUrl: './patients-internal.css',
})
export class PatientsInternal implements OnInit {
  readonly patients = signal<Patient[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(
    private readonly patientService: PatientsInternalService,
    private readonly encounterService: PatientsEncounterService,
    private readonly usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.loadPatients();
    this.loadDoctors();
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

  onCreatePatient(formData: Patient) {
    this.patientService.storePatient(formData).subscribe({
      next: (newPatient) => {
        console.log('Patient created:', newPatient);
      },
      error: (err) => {
        console.error('Create failed:', err);
      },
    });
  }

  onUpdatePatient(id: number, formData: Partial<Patient>) {
    this.patientService.updatePatient(id, formData).subscribe({
      next: (updatedPatient) => {
        console.log('Patient updated:', updatedPatient);
      },
      error: (err) => {
        console.error('Update failed:', err);
      },
    });
  }

  onDeletePatient(patient: Patient): void {
    this.patientService.deletePatient(patient.id).subscribe({
      next: () => {
        this.patients.update((list) => list.filter((p) => p.id !== patient.id));
      },
      error: (err) => console.error('Delete failed:', err),
    });
  }

  // Load doctors for the encounter form dropdown
  readonly doctors = signal<User[]>([]);

  loadDoctors(): void {
    this.usersService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors.set(doctors);

        // Update the dropdown options
        const doctorField = this.encounterFields.find(
          field => field.key === 'doctor_id'
        );

        if (doctorField) {
          doctorField.options = doctors
            .filter(doctor => doctor.id !== undefined)
            .map(doctor => ({
              label: `${doctor.name_last}, ${doctor.name_first}`,
              value: doctor.id as number,
            }));
        }
      },
      error: (err) => console.error(err),
    });
  }


  // --------- Table ----------
  columns: TableColumn[] = [
    {
      header: 'Patient ID',
      field: 'pid',
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
      header: 'Age',
      field: 'age',
      align: 'center',
    },

    {
      header: 'Sex',
      field: 'sex',
      class: 'badge',
      align: 'center',
    },

    {
      header: 'City',
      field: 'address_city',
    },

    {
      header: 'Actions',
      field: 'actions',
      align: 'right',
    },
  ];

  // ---------- Create & Edit Patient Modal ----------
  isModalOpen = signal(false);
  editingPatient = signal<Patient | null>(null);

  patientFields: FormFieldConfig[] = [
    { key: 'name_first', label: 'First Name', required: true, maxLength: 255 },
    { key: 'name_last', label: 'Last Name', required: true, maxLength: 255 },
    { key: 'name_middle', label: 'Middle Name' },
    {
      key: 'name_suffix',
      label: 'Suffix',
      type: 'select',
      options: [
        { label: 'Jr.', value: 'Jr.' },
        { label: 'Sr.', value: 'Sr.' },
        { label: 'III', value: 'III' },
        { label: 'IV', value: 'IV' },
      ],
    },
    { key: 'phone_number', label: 'Phone Number' },
    { key: 'blood_group', label: 'Blood Group' },
    { key: 'date_of_birth', label: 'Date of Birth', type: 'date' },
    {
      key: 'sex',
      label: 'Sex',
      type: 'select',
      required: true,
      options: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
        { label: 'Other', value: 'O' },
      ],
    },
    { key: 'age', label: 'Age', type: 'number', required: true },
    {
      key: 'civil_status',
      label: 'Civil Status',
      type: 'select',
      options: [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
        { label: 'Widowed', value: 'widowed' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Separated', value: 'separated' },
      ],
    },
    { key: 'place_of_birth', label: 'Place of Birth' },
    { key: 'religion', label: 'Religion' },
    { key: 'ethnicity', label: 'Ethnicity' },
    { key: 'address_street', label: 'Address Street' },
    { key: 'address_brgy', label: 'Address Barangay' },
    { key: 'address_city', label: 'Address City' },
    { key: 'address_province', label: 'Address Province' },
    { key: 'address_country', label: 'Address Country' },
    { key: 'address_zipcode', label: 'Address Zip Code' },
    { key: 'patient_mother_name', label: 'Name of Mother' },
    { key: 'patient_father_name', label: 'Name of Father' },
    { key: 'patient_guardian_name', label: 'Name of Guardian' },
    { key: 'patient_guardian_relationship', label: 'Relationship to Guardian' },
    { key: 'patient_spouse_name', label: 'Name of Spouse' },
  ];

  openCreateModal(): void {
    this.editingPatient.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(patient: Patient): void {
    this.editingPatient.set(patient);
    this.isModalOpen.set(true);
  }

  onModalSubmit(formValue: Record<string, any>): void {
    const editing = this.editingPatient();

    if (editing) {
      this.patientService.updatePatient(editing.id, formValue).subscribe({
        next: (updatedPatient) => {
          this.patients.update((list) =>
            list.map((p) => (p.pid === updatedPatient.pid ? updatedPatient : p)),
          );
          this.isModalOpen.set(false);
        },
        error: (err) => console.error('Update failed:', err),
      });
    } else {
      this.patientService.storePatient(formValue as Patient).subscribe({
        next: (newPatient) => {
          this.patients.update((list) => [...list, newPatient]);
          this.isModalOpen.set(false);
        },
        error: (err) => console.error('Create failed:', err),
      });
    }
  }

  // ---------- Search Bar ----------
  onSearch(query: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.patientService.searchPatients(query).subscribe({
      next: (patients) => {
        this.patients.set(patients);
        this.isLoading.set(false);
      },

      error: (err) => {
        this.error.set('Search failed.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  // ---------- Create Appointment Modal ----------
  readonly encounters = signal<PatientEncounter[]>([]);
  isEncounterOpen = signal(false);
  selectedPatientId = signal<number | null>(null);

  onCreateEncounter(formData: PatientEncounter) {
    this.encounterService.storeEncounter(formData).subscribe({
      next: (newEncounter) => {
        this.encounters.update((list) => [...list, newEncounter]);
        this.isEncounterOpen.set(false);
      },
      error: (err) => console.error('Create failed:', err),
    });
  }

  onEncounterSubmit(formValue: Record<string, any>): void {
    const payload = {
      ...formValue,
      patient_id: this.selectedPatientId(),
    };
    this.onCreateEncounter(payload as PatientEncounter);
  }

  openCreateEncounterModal(patient: Patient): void {
    console.log('clicked!', patient);
    this.selectedPatientId.set(patient.id);
    this.isEncounterOpen.set(true);
  }

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
      type: 'time'
    },
    {
      key: 'time_of_arrival',
      label: 'Time of Arrival',
      type: 'time'
    },
    {
      key: 'discharge_datetime',
      label: 'Discharge Date/Time',
      type: 'date',
    },
    {
      key: 'doctor_id',
      label: 'Doctor',
      type: 'select',
      options: [],
    },
  ];
  
}
