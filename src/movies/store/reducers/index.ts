import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMovies from './movies.reducer';

export interface AppState {
  movies: fromMovies.MovieState;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: fromMovies.reducer,
};

export const getAppState = createFeatureSelector<AppState>(
  'movies'
);
