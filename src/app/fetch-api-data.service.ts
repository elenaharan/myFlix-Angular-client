/**
 * The following are methods that are linked to API endpoints
 * @module FetchApiDataService
 */
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movietemple.herokuapp.com/';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, 
   * making it available via this.http
   * @param http the HTTP client
   */
// 
  constructor(
    private http: HttpClient,
    ) { }

/**
 * Making the api call for the user registration endpoint
 * this method takes an argument of type 'any'
 * pipe() is used to combine multiple functions into a single function
 * @param userDetails object containing user input values
 * @returns an Observable containing a response
 */
public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError)
  );
}

/**
 * Call for login/ API endpoint
 * @param userDetails the payload of the request
 * @returns an Observable containing a response
 */
public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login/', userDetails).pipe(catchError(this.handleError));
}

/**
 * Handles error passed in as an argument
 * @param error is an argument
 * @returns an error
 */
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
    'Something went wrong; please try again later.'
  );
}

/**
 * Calls the /movies endpoint
 * @returns an Observable containing an array of all movies in the DB
 */
getAllMovies(): Observable<any> {
  return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }
  )}).pipe(map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * Calls for /movies/movieId endpoint
 * @returns a single movie
 */
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

/**
 * Returns info about a single director
 * @returns info about a single director
 */
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

/**
 * Call for /genres/name endpoint
 * @returns an observable containing info about a single genre
 */
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

/**
 * calls for users/profile/user endpoint
 * @param username name of the user from the local storage
 * @returns an observable containing info about a single user
 */
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


/**
 * calls users/profile/user endpoint
 * @returns an Observable containing a response
 */
getFavourites(): Observable<any> {
  return this.http.get(apiUrl + `users/profile/${user}`, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * Calls POST /users/user/movies/movieId endpoint
 * @param id of a movie
 * @returns an observable containing a response
 */
AddToFavourites(id: string): Observable<any> {
  return this.http.post(apiUrl + `users/${user}/movies/${id}`, id, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * Calls PUT /users/update/user endpoint
 * @param userDetails object containing input values
 * @returns an observable containing a response
 */
editUser(userDetails: any): Observable<any> {
  const user = localStorage.getItem('user');
  return this.http.put(apiUrl + `users/update/${user}`, userDetails, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * Calls DELETE /users/user endpoint
 * @returns an Observable containing a response
 */
deleteUser(): Observable<any> {

  return this.http.delete(apiUrl + `users/${user}`, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * Calls DELETE users/user/movies/id endpoint
 * @param _id movie id
 * @returns an Observable containing a response
 */
deleteFromFavourites( _id: string): Observable<any> {
  return this.http.delete(apiUrl + `users/${user}/movies/${_id}`, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}




/**
 * Non-typed response extraction
 * @param res response to extract
 * @returns body of the response
 */
private extractResponseData(res: any | object): any {
  const body = res;
  return body || { };
}
}