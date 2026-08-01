import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn } from '../../shared/table/table';
import { Ward as WardModel, WardsService } from '../../core/services/external-api/wards-external.service';

@Component({
  selector: 'app-ward',
  imports: [ Table ],
  templateUrl: './ward.html',
  styleUrl: './ward.css',
})
export class Ward implements OnInit {
  readonly wards = signal<WardModel[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly wardsService: WardsService) {}

  ngOnInit(): void {
    this.loadWards();
  }

  loadWards(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.wardsService.getWards().subscribe({
      next: (wards) => {
        this.wards.set(wards);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load wards.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  columns: TableColumn[] = [
    {
      header: 'Ward ID',
      field: 'ward_id',
      class: 'id_badge',
    },
    {
      header: 'Description',
      field: 'description',
    },
    {
      header: 'Department No.',
      field: 'dept_nr',
      align: 'center',
    },
  ];
}
