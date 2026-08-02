import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn } from '../../shared/table/table';
import { Laboratory as LaboratoryModel, LaboratoryService } from '../../core/services/external-api/laboratory-external.service';
import { SearchBar } from "../../shared/search-bar/search-bar";

@Component({
  selector: 'app-laboratory',
  imports: [Table, SearchBar],
  templateUrl: './laboratory.html',
  styleUrl: './laboratory.css',
})
export class Laboratory {
  readonly laboratories = signal<LaboratoryModel[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly laboratoryService: LaboratoryService) {}

  ngOnInit(): void {
    this.loadLaboratory();
  }

  loadLaboratory(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.laboratoryService.getLaboratories().subscribe({
      next: (laboratories) => {
        this.laboratories.set(laboratories);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load laboratories.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  columns: TableColumn[] = [
    {
      header: 'Ward ID',
      field: 'code',
      class: 'id_badge',
    },
    {
      header: 'Description',
      field: 'test',
    },
    {
      header: 'Description',
      field: 'section',
    },
    {
      header: 'Description',
      field: 'opd',
      align: 'center',
    },
    {
      header: 'Description',
      field: 'ipd',
      align: 'center',
    },
  ];
}
