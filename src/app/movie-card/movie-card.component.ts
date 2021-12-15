import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  //a variable names movies is declared as an array.
  //This is where the movies from the API call will be kept.
  movies: any[] = [];
  user: any = localStorage.getItem('user');
  favouriteMovies: any[] = this.user.FavouriteMovies;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  //the function is called inside lifecycle hook ngOnInit()
  ngOnInit(): void {
    this.getMovies();
    //this.getUserFavourites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
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

  /*getUserFavourites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getFavourites(this.user.Username).subscribe((result: any) => {
      this.favouriteMovies = result.Favourites;
      return this.favouriteMovies;
    });
  }

  addToFavourites(movieId: string, title: string): void {
    this.fetchApiData
    .AddToFavourites(this.user.Username, movieId)
    .subscribe((result: any) => {
      this.snackBar.open(
        `${title} has been added to your favourite movies!`, 'Amazing!', {
          duration: 3000,
        }
      );
      this.ngOnInit();
    });
    return this.getUserFavourites();
  }

  deleteFromFavourites(movieId: string, title: string): void {
    this.fetchApiData
      .deleteFromFavourites(this.user.Username, movieId)
      .subscribe((result: any) => {
        this.snackBar.open(
          `${title} has been removed from your favourite movies`, 'Ok!', {
            duration: 3000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavourites();
  }

  isFavourite(movieId: string): boolean {
    return this.favouriteMovies.some((movie) => movie._id === movieId);
  }

  toggleFavourites(movie: any): void {
    this.isFavourite(movie._id)
   // ? this.deleteFromFavourites(movie._id, movie.Title)
   // : this.addToFavourites(movie._id, movie.Title);
  }*/
}
