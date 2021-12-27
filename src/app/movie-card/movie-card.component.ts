import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }

  //a variable names movies is declared as an array.
  //This is where the movies from the API call will be kept.
  movies: any[] = [];
  user: any = localStorage.getItem('user');
  favorites: any[] = [];

  //the function is called inside lifecycle hook ngOnInit()
  ngOnInit(): void {
    this.getMovies();
    
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDirectorDialog(
    name: string,
    bio: string
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        name,
        bio,
      },
      width: '500px',
    });
  }

  openSynopsisDialog(
    title: string,
    description: string,
  ): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        title,
        description,
      },
      width: '500px'
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  getUserFavs(): void {
    this.fetchApiData.getAUser(this.user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }

  addToFavorites(id: string, Title: string): void {
    this.fetchApiData.AddToFavourites(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorites`, 'OK', {
        duration: 3000,
      });
      return this.getUserFavs();
    });
  }

  setFavoriteStatus(id: any): any {
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  

  removeFromFavorites(id: string, Title: string): void {
    this.fetchApiData.deleteFromFavourites(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from favourites`, 'OK', {
        duration: 3000,
      });
      window.location.reload();
      return this.getUserFavs();
    })
  }

  


}
