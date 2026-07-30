import { Component, input } from '@angular/core';

export interface TableColumn {
  header: string;
  field: string;

  class?: string;

  align?: 'left' | 'center' | 'right';

  width?: string;
}

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {

  columns = input.required<TableColumn[]>();

  rows = input.required<any[]>();
}
