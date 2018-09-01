import { Injectable } from '@angular/core';

import {Effect, Actions, ofType} from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as movieActions from '../actions/movies.action';
import * as fromServices from '../../services';
import {SearchMoviesSuccess} from '../actions/movies.action';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private movieService: fromServices.MoviesService
  ) {}

  @Effect()
  loadMovies$ = this.actions$.pipe(ofType(movieActions.LOAD_MOVIES)).pipe(
    switchMap(() => {
      return this.movieService
        .getMovies()
        .pipe(
          map(movies => new movieActions.LoadMoviesSuccess(movies)),
          catchError(error => of(new movieActions.LoadMoviesFail(error)))
        );
    })
  );
  @Effect()
  loadSearchMovies$ = this.actions$.pipe(ofType(movieActions.SEARCH_MOVIES)).pipe(
    map((action: movieActions.SearchMovies) => action.payload),
    switchMap((searchValue) => {
      return this.movieService
        .getGenreMovies(searchValue.currentGenre)
        .pipe(
          map(movies => new movieActions.SearchMoviesSuccess({movies, query: searchValue.query})),
          catchError(error => of(new movieActions.SearchMoviesFail(error)))
        );
    })
  );
  @Effect()
  loadGenreMovies$ = this.actions$.pipe(ofType(movieActions.LOAD_MOVIES_GENRE)).pipe(
    map((action: movieActions.LoadMoviesGenre) => action.payload),
    switchMap((genreType) => {
      return this.movieService
        .getGenreMovies(genreType)
        .pipe(
          map(movies => {
            return new movieActions.LoadMoviesGenreSuccess(movies);
          }),
          catchError(error => of(new movieActions.LoadMoviesGenreFail(error)))
        );
    })
  );

}
