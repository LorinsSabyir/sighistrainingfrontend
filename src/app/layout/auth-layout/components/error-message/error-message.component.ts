import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
}
