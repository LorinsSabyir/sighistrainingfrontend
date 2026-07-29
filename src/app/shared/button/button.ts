import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() button_text: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  buttonClicked() {
    this.buttonClick.emit();
  }
}
