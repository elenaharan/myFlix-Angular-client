/**
 * EditUserProfileComponent view lets user edit their profile info.
 * @module EditUserProfileComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  user: any = {};

  /**
   * This decorator binds the form input values to the userData object
   */
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,  
  ) { }

  /**
   * Initializes the component
   * @ignore
   */
  ngOnInit(): void {}

  /**
   * Updates user info by sending it to the backend.
   * Calls fetchApiData.editUser() with this.userData details
   * and locally stores user name.
   * A snackbar confirms whether the operation is completed.
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('user', res.Username);
      this.snackBar.open(this.userData.Username, 'User details have been successfully updated!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }
}
