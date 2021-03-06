/**
 * DirectorViewComponent is a dialog window that a user can open to read bio of a movie director.
 * @module DirectorViewComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
    }
  ) { }

  /**
   * Initializes the component
   * @ignore
   */

  ngOnInit(): void {
  }

}
