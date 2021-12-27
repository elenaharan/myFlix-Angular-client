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

  toProfile(): void {
    const user = localStorage.getItem('user');
    this.router.navigate(['/profile'])
      .then(success =>( success))
      .catch(console.error);
    return 
  }
  
  toMovies(): void {
    this.router.navigate(['/movies'])
      .then(success => (success))
      .catch(console.error); 
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome'])
      .then(success => console.log(success))
      .catch(console.error);
  }

  
}
