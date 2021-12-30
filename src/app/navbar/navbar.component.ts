/**
 * NavbarComponent renders a navbar to facilitate user navigation
 * within the app.
 * @module NavbarComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  /**
   * Takes user to Profile view where user profile details are displayed.
   */
  toProfile(): void {
    const user = localStorage.getItem('user');
    this.router.navigate(['/profile'])
      .then(success =>( success))
      .catch(console.error);
  }
  
  /**
   * Navigates user to main page where all movies are displayed.
   */
  toMovies(): void {
    this.router.navigate(['/movies'])
      .then(success => (success))
      .catch(console.error); 
  }

  /**
   * Logs user out.
   * Clears local storage and navigates user to welcome page.
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome'])
      .then(success => console.log(success))
      .catch(console.error);
  }

  
}
