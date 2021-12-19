import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  toProfile(): void {
    const user = localStorage.getItem('user');
    this.router.navigate(['/profile'])
      .then(success =>( success))
      .catch(console.error);
  }

}
