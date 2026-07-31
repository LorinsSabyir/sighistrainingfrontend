import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn, TableCellDef  } from '../../shared/table/table';
import { Patient, PatientsInternalService } from '../../core/services/patients-internal.service';
import { FormFieldConfig, ModalForm } from '../../shared/modal-form/modal-form';
import { Button } from "../../shared/button/button";
import { SearchBar, SearchEvent } from '../../shared/search-bar/search-bar';

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

  constructor(private readonly patientService: PatientsInternalService) {}

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
        this.patients.update(list =>
          list.filter(p => p.id !== patient.id)
        );
      },
      error: (err) => console.error('Delete failed:', err),
    });
  }
  
  onCreateAppointment(patient: Patient): void {
    // TODO: not built yet — where should this navigate/open to?
    console.log('Create appointment for', patient.pid);
  }


  // --------- Table ---------- 
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
      field: 'address_city'
    },

    {
      header: 'Actions',
      field: 'actions',
      align: 'right',
    }

  ];

  // ---------- Modal ----------
  isModalOpen = signal(false);
  editingPatient = signal<Patient | null>(null);

  patientFields: FormFieldConfig[] = [
    { key: 'name_first', label: 'First Name', required: true, maxLength: 255 },
    { key: 'name_last', label: 'Last Name', required: true, maxLength: 255 },
    { key: 'name_middle', label: 'Middle Name' },
    { key: 'name_suffix', label: 'Suffix', type: 'select', options: [
        { label: 'Jr.', value: 'Jr.' },
        { label: 'Sr.', value: 'Sr.' },
        { label: 'III', value: 'III' },
        { label: 'IV', value: 'IV' }
    ]},
    { key: 'phone_number', label: 'Phone Number' },
    { key: 'blood_group', label: 'Blood Group' },
    { key: 'date_of_birth', label: 'Date of Birth', type: 'date' },
    { key: 'sex', label: 'Sex', type: 'select', required: true, options: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
        { label: 'Other', value: 'O' }
    ]},
    { key: 'age', label: 'Age', type: 'number', required: true},
    { key: 'civil_status', label: 'Civil Status', type: 'select', options: [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
        { label: 'Widowed', value: 'widowed' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Separated', value: 'separated' }
    ]},
    { key: 'place_of_birth', label: 'Place of Birth'},
    { key: 'religion', label: 'Religion'},
    { key: 'ethnicity', label: 'Ethnicity'},
    { key: 'address_street', label: 'Address Street'},
    { key: 'address_brgy', label: 'Address Barangay'},
    { key: 'address_city', label: 'Address City'},
    { key: 'address_province', label: 'Address Province'},
    { key: 'address_country', label: 'Address Country'},
    { key: 'address_zipcode', label: 'Address Zip Code'},
    { key: 'patient_mother_name', label: 'Name of Mother'},
    { key: 'patient_father_name', label: 'Name of Father'},
    { key: 'patient_guardian_name', label: 'Name of Guardian'},
    { key: 'patient_guardian_relationship', label: 'Relationship to Guardian'},
    { key: 'patient_spouse_name', label: 'Name of Spouse'},
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
            list.map((p) => (p.pid === updatedPatient.pid ? updatedPatient : p))
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
  onSearch(event: SearchEvent): void {
    this.isLoading.set(true);
    this.error.set(null);
  
    switch (event.type) {
  
      case 'pid':
        this.patientService.getPatientByPid(event.pid!).subscribe({
          next: (result) => { this.patients.set([result]); this.isLoading.set(false); },
          error: (err) => { this.error.set('Patient not found.'); this.isLoading.set(false); console.error(err); },
        });
        break;
  
      case 'name':
        this.patientService.searchPatient(event.lastName ?? '', event.firstName ?? '').subscribe({
          next: (results) => { this.patients.set(results); this.isLoading.set(false); },
          error: (err) => { this.error.set('Search failed.'); this.isLoading.set(false); console.error(err); },
        });
        break;
    }
  }

}
