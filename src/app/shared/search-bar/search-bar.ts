import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from "../button/button";

export interface SearchField {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date';
  placeholder?: string;
}

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, Button],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  searched = output<string>();

  query = signal('');

  onSubmit() {
    this.searched.emit(this.query().trim());
  }

  clear(): void {
    this.query.set('');
    this.searched.emit('');
  }
}
