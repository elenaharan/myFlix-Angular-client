import { Component } from '@angular/core';
//import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
//import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
//import { MatDialog } from '@angular/material/dialog';
//import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  /*//passing Angular Material dialog in the constructor as an argument
  constructor(public dialog: MatDialog) { }
  //This is the function that will open the dialog when the sign up button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //Assigning the dialog a width
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      //Assigning the dialog a width
      width: '280px'
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
  
}*/}