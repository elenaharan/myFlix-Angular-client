/**
 * UserLoginFormComponent allows user to log into the app.
 * @module UserLoginFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';
//You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//This import brings in the API calls that were previously created
import { FetchApiDataService } from '../fetch-api-data.service';
//This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  
  /**
   * This decorator binds the input values of the form to userData object.
   */
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Sends the form inputs to backend.
   * Snackbar pops up to inform user about the outcome of the operation.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', this.userData.Username);
        this.dialogRef.close();
        this.router.navigate(['movies']);
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 3000
        });
    });
    } 
  }