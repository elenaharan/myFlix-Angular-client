import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movietemple.herokuapp.com/';
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
// Inject the HttpClient module to the constructor params
// This will provide HttpClient to the entire class, making it available via this.http
  constructor(
    private http: HttpClient,
    ) { }

//Making the api call for the user registration endpoint
//this method takes an argument of type 'any'
//pipe() is used to combine multiple functions into a single function
public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError)
  );
}

public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login/', userDetails).pipe(catchError(this.handleError));
}

private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
  } else {
    console.error(
      `Error status code ${error.status}, ` +
      `Error body is: ${error.error}`
    );
  }
  return throwError(
    'Something bad happened; please try again later.'
  );
}

getAllMovies(): Observable<any> {
  return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }
  )}).pipe(map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//Get a single movie
getAMovie(): Observable<any> {
  return this.http.get(apiUrl + 'movies/:movieId', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
}

//Get a director
getADirector(): Observable<any> {
  return this.http.get(apiUrl + 'directors/:name/:movieId', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
}

//Get a genre
getAGenre(): Observable<any> {
  return this.http.get(apiUrl + 'genres/:name', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
}

//Get a user
getAUser(username: any): Observable<any> {
  const user = localStorage.getItem('user');
  return this.http.get(apiUrl + `users/profile/${user}`, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//Get favorite movies for a user
getFavourites(username: any): Observable<any> {
  return this.http.get(apiUrl + `users/profile/${username}`, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

AddToFavourites(username: any, _id: string): Observable<any> {
  return this.http.post(apiUrl + `users/${username}/movies/${_id}`, _id, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//Edit user
editUser(userDetails: any, username: any): Observable<any> {
  return this.http.put(apiUrl + `users/update/${username}`, userDetails, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//Delete user
deleteUser(username: any): Observable<any> {
  return this.http.delete(apiUrl + `users/${username}`, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//Delete a movie from favorites
deleteFromFavourites(username: any, _id: string): Observable<any> {
  return this.http.delete(apiUrl + `users/${username}/movies/${_id}`, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}



//Non-typed response extraction
private extractResponseData(res: any | object): any {
  const body = res;
  return body || { };
}
}