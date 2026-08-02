import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn } from '../../shared/table/table';
import { Radiology as RadiologyModel, RadiologyService } from '../../core/services/external-api/radiology-external.service';
import { SearchBar } from "../../shared/search-bar/search-bar";

@Component({
  selector: 'app-radiology',
  imports: [Table, SearchBar],
  templateUrl: './radiology.html',
  styleUrl: './radiology.css',
})
export class Radiology implements OnInit {
  readonly radiology = signal<RadiologyModel[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly radiologyService: RadiologyService) {}

  ngOnInit(): void {
    this.loadRadiology();
  }

  loadRadiology(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.radiologyService.getRadiologys().subscribe({
      next: (radiology) => {
        this.radiology.set(radiology);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load radiology.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  columns: TableColumn[] = [
    {
      header: 'Radiology ID',
      field: 'code',
      class: 'id_badge',
    },
    {
      header: 'Test',
      field: 'test',
    },
    {
      header: 'Group Code',
      field: 'group_code',
    },
    {
      header: 'Group',
      field: 'group',
    },
    {
      header: 'Section Code',
      field: 'section_code',
    },
    {
      header: 'Section',
      field: 'section',
    },
  ];
}
