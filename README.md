# MyFlixAngularClient

This is the client-side application project called myFlix based on its existing server-side code (REST API and database), with supporting documentation generated with the help of TypeDoc.<br>
MyFlixAngularClient is a single-page, responsive movie app built with Angular, with routing and several interface views.

## User Stories
<li> As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I've watched or am interested in. </li>
<li> As a user, I want to be able to create a profile so that I can save data about my favorite movies.</li>

## Key Features
<ul>
<li> App displays a welcome view where users can either log in or register an account.</li>
<li> Once authenticated, the user should view all movies.</li>
<li> Each movie card contains additional features: </li>
<ul>
<li> A button that when clicked opens a director dialog, where details about the director of that particular movie are displayed.</li>
<li> A button that when clicked opens up a genre dialog, where details about that particular genre of the movie are displayed. </li> 
<li> A button that when clicked opens up a synopsis dialog, where details about synopsis of the movie are displayed.</li>
</ul>
</ul>

## Technical Requirements
<ul>
<li> The application is written in Angular (version 13.0.3)</li>
<li> The application requires the latest version of Node.js and npm package</li>
<li> The application contains user registration and login forms </li>
<li> The Application is designed using Angular Material </li>
<li> The application's codebase contains comments using TypeDoc </li>
<li> The project contains technical documentation using TypeDoc </li>
<li> The project is hosted on GitHub Pages </li>
</ul>


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. <br>
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.
