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

export class UserLoginFormComponent {
  
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  //ngOnInit(): void {
  //}

  //This is the function responsible for sending the form inputs to backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result: { token: string; user: { Username: string } }) => {
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', this.userData.Username)
        /*this.snackBar.open(result.user.Username + ' logged in', {
          duration: 3000
        })
      },
      error: () => {
        this.snackBar.open("This user doesn't exist", {
          duration: 3000
        })*/
      },
      complete: () => {
        this.dialogRef.close()
        this.router.navigate(['movies']);
      }
    })
    //this.fetchApiData.userLogin(this.userData).subscribe(response) = > {
      //localStorage.setItem('user', response.user.Username);
      //localStorage.setItem('token', response.token);
      //this.dialogRef.close();//This will close the modal on success!
      //console.log(response);
      //this.snackBar.open(response, 'OK', {
      //duration: 3000
      //});
    //}, //(response) => {
      //console.log(response);
      //this.snackBar.open(response, 'OK', {
        //duration: 3000
      //});
    //});
//}
//}

  } 
  }