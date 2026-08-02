import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn } from '../../shared/table/table';
import { Nurse as NurseModel, NursesService } from '../../core/services/external-api/nurses-external.service';
import { SearchBar } from "../../shared/search-bar/search-bar";
import { Button } from "../../shared/button/button";

@Component({
  selector: 'app-nurse',
  imports: [Table, SearchBar, Button],
  templateUrl: './nurse.html',
  styleUrl: './nurse.css',
})
export class Nurse implements OnInit {
  readonly nurses = signal<NurseModel[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly nursesService: NursesService) {}

  ngOnInit(): void {
    this.loadNurse();
  }

  loadNurse(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.nursesService.getNurses().subscribe({
      next: (nurses) => {
        this.nurses.set(nurses);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load nurses.');
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
