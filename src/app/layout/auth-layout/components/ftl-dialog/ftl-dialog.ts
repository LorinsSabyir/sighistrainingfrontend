import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ftl-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Password Security Update</h2>
    <mat-dialog-content>
      <div class="my-4">
        <p class="text-gray-600">
          Your account was created with a temporary password. For your security, you must create a new password before accessing your dashboard.
        </p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton="filled" color="primary" (click)="onUpdate()">Update Password Now</button>
    </mat-dialog-actions>
  `
})
export class FtlDialog {
  constructor(public dialogRef: MatDialogRef<FtlDialog>) { }
  onUpdate() {
    this.dialogRef.close(true);
  }
}
