import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {Subscription} from "rxjs/index";
import {GlobalService} from "../services/global.service";
import {Router} from "@angular/router";
import {MovieService} from "../services/movie.service";
import {Movie} from "../models/movie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  account: User = new User();
  userSub: Subscription;
  movies;
  selectedMovie: Movie;
  movieInput: FormGroup;
  isAddEditMode: boolean;
  isEdit: boolean;

  constructor(private global: GlobalService, private router: Router,
              private movieService: MovieService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userSub = this.global.user.subscribe(me => this.account = me);
    if(localStorage.getItem('token') && localStorage.getItem('account'))  {
      this.global.me = JSON.parse(localStorage.getItem('account'));
      this.getMovies();
    }
    else {
      this.router.navigate(['/login']);
    }
    this.movieInput = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.isAddEditMode = false;
    this.isEdit = false;
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      movies => {
        this.movies = movies;
        console.log('movies', movies);
      },
      error => {
        console.log('error', error)
      }
    )
  }

  movieClicked(movie) {
    console.log('movie clicked', movie);
    this.selectedMovie = movie;
    this.isAddEditMode = false;
  }

  addMovieClicked() {
    this.isEdit = false;
    this.isAddEditMode = true;
    this.selectedMovie = null;
    this.movieInput.reset();
  }

  editMovieClicked() {
    this.isAddEditMode = true;
    this.isEdit = true;
    this.movieInput = this.fb.group({
      title: [this.selectedMovie.title, Validators.required],
      description: [this.selectedMovie.description, Validators.required]
    });
    // this.selectedMovie = null;
  }

  submitMovie() {
    if (this.isEdit) {
      this.movieService.editMovie(this.movieInput.value, this.selectedMovie.id).subscribe(
        response => {
          const movieIndex = this.movies.map(function (e) { return e.id; }).indexOf(this.selectedMovie.id);
          if (movieIndex > 0) {
            this.movies[movieIndex] = response;
            this.selectedMovie = response;
          }
          // this.movies.push(response);
          this.movieInput.reset();
          this.isAddEditMode = false;
        },
        error => {
          console.log('error', error);
        }
      )
    }
    else {
      this.movieService.addMovie(this.movieInput.value).subscribe(
        response => {
          this.movies.push(response);
          this.movieInput.reset();
          this.isAddEditMode = false;
        },
        error => {
          console.log('error', error);
        }
      )
    }
  }

  logoutClicked() {
    this.global.me = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    this.router.navigate(['/login'])
  }

}
