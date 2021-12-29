/**
 * UserProfileComponentComponent allows user to view their profile details
 * and also list of their favorite movies.
 * @module UserProfileComponentComponent
 */
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

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    this.getUserInfo();
    this.getFavourites();
  }

  /**
   * Gets user info from local storage
   */
  getUserInfo(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getAUser(user).subscribe((response: any) => {
      this.user = response;
      this.getMovies();
      console.log(this.user);
    });
  }

  /**
   * Opens edit user details dialog
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '300px',
    });
  }
  
  /**
   * Opens delete user profile dialog.
   * If user confirms the intend to delete the account, 
   * local storage get cleared, snackbar shows the outcome
   * and user is navigated to welcome page
   */
  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.snackBar.open('Your account has been deleted!', 'OK', {
          duration: 3000
        });
        this.router.navigate(['welcome']);
      });
    }
  }

  /**
   * Retries array of user's favorite movies.
   */
  getFavourites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getAUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      //console.log('favs', this.favorites);
      return this.favorites;
    }); 
  }

  /**
   * Gets all user's favorite movies 
   * @returns filterMovies().
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.showFavs = resp;
      //console.log(this.showFavs);
      return this.filterMovies();
    });
  }

  
/**
 * Creates an array of user's favorite movies
 * @returns an array of user favorite movies
 */
  filterMovies(): void {
    this.showFavs.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favoriteMovies.push(movie);
      }
      //console.log(this.favoriteMovies);
    });
    return this.favoriteMovies;
  }

  /**
   * Removes a movie from user's list of favorite movies
   */
  removeFromFavs(id: string, Title: string): void {
    this.movieCard.removeFromFavorites(id, Title);
  }
}
