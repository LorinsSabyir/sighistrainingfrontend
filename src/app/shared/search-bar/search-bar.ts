import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type SearchType = 'id' | 'pid' | 'name';

export interface SearchEvent {
  type: SearchType;
  id?: number;
  pid?: string;
  lastName?: string;
  firstName?: string;
}

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  searchType = signal<SearchType>('pid');

  pidValue = signal('');
  lastNameValue = signal('');
  firstNameValue = signal('');

  searched = output<SearchEvent>();

  onSearchTypeChange(type: SearchType): void {
    this.searchType.set(type);
  }

  // TODO:
  // onClearSearch(): void {
  //   this.pidValue = "";
  // }

  onSubmit(): void {
    const type = this.searchType();

    if (type === 'pid') {
      if (!this.pidValue().trim()) return;
      this.searched.emit({ type: 'pid', pid: this.pidValue().trim() });
      return;
    }

    if (type === 'name') {
      if (!this.lastNameValue().trim() && !this.firstNameValue().trim()) return;
      this.searched.emit({
        type: 'name',
        lastName: this.lastNameValue().trim(),
        firstName: this.firstNameValue().trim(),
      });
    }
  }
}