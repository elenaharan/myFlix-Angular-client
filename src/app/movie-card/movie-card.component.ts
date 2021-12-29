/**
 * MovieCardComponent displays all movies to user in form of cards.
 * Each card enables user to view extra info on movie synopsis, genre and director.
 * User can also add movies to list of favourites.
 * @module MovieCardComponent
 */

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
  /**
   * Variable named movies is declared as an array.
   * This is where the movies from the API call will be kept.
   */
  
  movies: any[] = [];
  user: any = localStorage.getItem('user');
  favorites: any[] = [];

  /**
   * Initializes component - gets all the movies and user favourites.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUserFavs();
  }
  
  /**
   * Retrieves all movies from the database
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens dialog containing info about the director
   * @param name name of the director
   * @param bio bio of the director
   */
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

  /**
   * Opens dialog containing info about the movie.
   * @param title title of the movie
   * @param description description of the movie
   */
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

  /**
   * Opens dialog containing info about the genre of the movie
   * @param name name of the genre
   * @param description description of the genre
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  /**
   * retrieves films from the list of favourites in the atlas database
   */
  getUserFavs(): void {
    this.fetchApiData.getAUser(this.user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * adds films to user's FavoriteFilms in the database
   * @param id is the movie id
   * @param Title is the title of the movie
   */
  addToFavorites(id: string, Title: string): void {
    this.fetchApiData.AddToFavourites(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorites`, 'OK', {
        duration: 3000,
      });
      return this.getUserFavs();
    });
  }

  /**
   * checks whether the status of a movie is favorite or not
   * @param id id of the movie
   * @returns a boolean
   */
  setFavoriteStatus(id: any): any {
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  

  /**
   * Removes a movie from user's list of favorites.
   * @param id is a movie's id
   * @param Title is a movie's Title
   */
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
