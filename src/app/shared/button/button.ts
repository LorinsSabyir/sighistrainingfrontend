import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type ButtonVariant =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'secondary';

  export type ButtonIcon =
  | 'edit'
  | 'appointment'
  | 'delete'
  | 'pencil'
  | 'calendar-plus'
  | 'trash-2'
  | null;

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() button_text = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled = false;

  // Any Material icon name
  @Input() icon?: string;

  @Input() iconOnly = false;

  @Output() buttonClick = new EventEmitter<void>();

  buttonClicked(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }

  readonly variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] text-white',

    success:
      'bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] active:bg-[var(--color-success-active)] text-white',

    danger:
      'bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] active:bg-[var(--color-danger-active)] text-white',

    warning:
      'bg-[var(--color-warning)] hover:bg-[var(--color-warning-hover)] active:bg-[var(--color-warning-active)] text-white',

    info:
      'bg-[var(--color-info)] hover:bg-[var(--color-info-hover)] active:bg-[var(--color-info-active)] text-white',

    secondary:
      'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)] text-white',
  };

  readonly disabledClasses =
    'bg-[var(--color-disabled-bg)] text-[var(--color-disabled-text)] border border-[var(--color-disabled-border)] cursor-not-allowed';

  get buttonClasses(): string {
    return this.disabled
      ? this.disabledClasses
      : this.variantClasses[this.variant];
  }
}