import { Action } from '@ngrx/store';

import { IMovie } from '../../models/movies.model';

// load movies
export const LOAD_MOVIES = '[MoviesList] Load Movie';
export const LOAD_MOVIES_FAIL = '[MoviesList] Load Movie Fail';
export const LOAD_MOVIES_SUCCESS = '[MoviesList] Load Movie Success';

export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
}

export class LoadMoviesFail implements Action {
  readonly type = LOAD_MOVIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadMoviesSuccess implements Action {
  readonly type = LOAD_MOVIES_SUCCESS;
  constructor(public payload: IMovie[]) {}
}

// action types
export type MoviesAction =
  | LoadMovies
  | LoadMoviesFail
  | LoadMoviesSuccess;

