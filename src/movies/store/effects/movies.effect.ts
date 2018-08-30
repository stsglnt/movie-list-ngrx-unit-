import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as movieActions from '../actions/movies.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private movieService: fromServices.MoviesService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(movieActions.LOAD_MOVIES).pipe(
    switchMap(() => {
      return this.movieService
        .getMovies()
        .pipe(
          map(pizzas => new movieActions.LoadMoviesSuccess(pizzas)),
          catchError(error => of(new movieActions.LoadMoviesFail(error)))
        );
    })
  );

}
