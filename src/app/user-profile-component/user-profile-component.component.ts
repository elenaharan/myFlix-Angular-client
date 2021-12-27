import { Component, OnInit, NgModule } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorViewComponent } from '../director-view/director-view.component';


@Component({
  selector: 'app-user-profile-component',
  templateUrl: './user-profile-component.component.html',
  styleUrls: ['./user-profile-component.component.scss']
})
export class UserProfileComponentComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    public movieCard: MovieCardComponent,
  ) { }

  user: any = {};
  movies: any[] = [];
  favorites: any[] = [];
  showFavs: any[] = [];
  favoriteMovies: any = [];

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavourites();
  }

  getUserInfo(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getAUser(user).subscribe((response: any) => {
      this.user = response;
      this.getMovies();
      console.log(this.user);
    });
  }

  openEditProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '300px',
    });
  }
  
  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/welcome']);
        this.snackBar.open('Your account has been deleted!', 'OK', {
          duration: 3000
        });
      });
    }
  }

  getFavourites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getAUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log('favs', this.favorites);
      return this.favorites;
    }); 
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.showFavs = resp;
      console.log(this.showFavs);
      return this.filterMovies();
    });
  }

  

  filterMovies(): void {
    this.showFavs.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favoriteMovies.push(movie);
      }
      console.log(this.favoriteMovies);
    });
    return this.favoriteMovies;
  }

  removeFromFavs(id: string, Title: string): void {
    this.movieCard.removeFromFavorites(id, Title);
  }
}
