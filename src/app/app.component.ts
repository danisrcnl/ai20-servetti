import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'VirtualLab';
  section = "Applicazioni Internet";
  sidenavOptions: string[] = ["Applicazioni Internet", "Programmazione di Sistema"];

  username: string;
  password: string;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {}

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  toggleForMenuClick(event: Event) {
    this.sidenav.opened = (this.sidenav.opened === true) ? false : true;
  }

  changeSection(section: string) {
    this.section = section;
  }

  openDialog() {

    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: {
        username: this.username,
        password: this.password
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.username = result.username;
      this.password = result.password;
      console.log(this.username + this.password);
    });
  }

}

