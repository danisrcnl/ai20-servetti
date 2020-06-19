import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    username: string;
    password: string;
  }

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css']
  })
  export class LoginDialogComponent {
  
    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  
    }
  
    login(): void {
      this.dialogRef.close(this.data);
    }

    cancel(): void {
      this.dialogRef.close();
    }
  
  }