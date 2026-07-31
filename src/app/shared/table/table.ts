import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  Input,
  QueryList,
  TemplateRef,
  input,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

export interface TableColumn {
  header: string;
  field: string;
  class?: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

@Directive({
  selector: '[appTableCell]',
  standalone: true,
})
export class TableCellDef {
  @Input('appTableCell')
  field!: string;

  constructor(
    public template: TemplateRef<any>
  ) {}
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    NgTemplateOutlet,
    TableCellDef,
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements AfterContentInit {

  columns = input.required<TableColumn[]>();

  rows = input.required<any[]>();

  @ContentChildren(TableCellDef)
  templates!: QueryList<TableCellDef>;

  ngAfterContentInit() {
    console.log('Templates:', this.templates.toArray());
  }

  template(field: string): TemplateRef<any> | null {
    return this.templates.find(t => t.field === field)?.template ?? null;
  }
}