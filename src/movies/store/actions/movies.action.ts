import { Action } from '@ngrx/store';

import { IMovie } from '../../models/movies.model';

// load movies
export const LOAD_MOVIES = '[MoviesList] Load Movie';
export const LOAD_MOVIES_FAIL = '[MoviesList] Load Movie Fail';
export const LOAD_MOVIES_SUCCESS = '[MoviesList] Load Movie Success';
// load based on genres
export const LOAD_MOVIES_GENRE = '[MoviesList] Load Movie Genre';
export const LOAD_MOVIES_GENRE_FAIL = '[MoviesList] Load Movie Genre Fail';
export const LOAD_MOVIES_GENRE_SUCCESS = '[MoviesList] Load Movie Genre Success';
// search movies
export const SEARCH_MOVIES = '[MoviesList] Search Movie ';
export const SEARCH_MOVIES_FAIL = '[MoviesList] Search Movie Fail';
export const SEARCH_MOVIES_SUCCESS = '[MoviesList] Search Movie Success';
// load actions
export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
}
export class LoadMoviesFail implements Action {
  readonly type = LOAD_MOVIES_FAIL;
  constructor(public payload: any) {}
}
export class LoadMoviesSuccess implements Action {
  readonly type = LOAD_MOVIES_SUCCESS;
  constructor(public payload: any) {}
}
// genre actions
export class LoadMoviesGenre implements Action {
  constructor(public payload: any) {}
  readonly type = LOAD_MOVIES_GENRE;
}
export class LoadMoviesGenreFail implements Action {
  readonly type = LOAD_MOVIES_GENRE_FAIL;
  constructor(public payload: any) {}
}
export class LoadMoviesGenreSuccess implements Action {
  readonly type = LOAD_MOVIES_GENRE_SUCCESS;
  constructor(public payload: IMovie[]) {}
}
// search action
export class SearchMovies implements Action {
  readonly type = SEARCH_MOVIES;
  constructor(public payload: {query: string, currentGenre: string}) {}
}
export class SearchMoviesSuccess implements Action {
  readonly type = SEARCH_MOVIES_SUCCESS;
  constructor(public payload: {movies: IMovie[], query: string}) {}
}
export class SearchMoviesFail implements Action {
  readonly type = SEARCH_MOVIES_FAIL;
  constructor(public payload: any) {}
}

// action types
export type MoviesAction =
  | LoadMovies
  | LoadMoviesFail
  | LoadMoviesSuccess
  | LoadMoviesGenre
  | LoadMoviesGenreFail
  | LoadMoviesGenreSuccess
  | SearchMovies
  | SearchMoviesSuccess
  | SearchMoviesFail;

