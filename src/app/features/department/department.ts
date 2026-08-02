import { Component, OnInit, signal } from '@angular/core';
import { Table, TableColumn } from '../../shared/table/table';
import { Department as DepartmentModel, DepartmentsService } from '../../core/services/external-api/departments-external.service';
import { SearchBar } from "../../shared/search-bar/search-bar";
import { Button } from "../../shared/button/button";

@Component({
  selector: 'app-department',
  imports: [Table, SearchBar, Button],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  readonly departments = signal<DepartmentModel[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.departmentsService.getDepartments().subscribe({
      next: (departments) => {
        this.departments.set(departments);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load departments.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  columns: TableColumn[] = [
    {
      header: 'Department No.',
      field: 'deptnr',
      class: 'id_badge',
    },
    {
      header: 'Department ID',
      field: 'deptid',
    },
    {
      header: 'Name',
      field: 'dept_name',
    },
    {
      header: 'Short Name',
      field: 'dept_shortname',
    },
    {
      header: 'Parent Department',
      field: 'parent_name',
    },
  ];
}