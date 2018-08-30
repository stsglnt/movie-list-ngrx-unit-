import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromMovies from '../reducers/movies.reducer';

import { IMovie } from '../../models/movies.model';

export const getMovieState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state.movies
);

export const getMoviesEntities = createSelector(
  getMovieState,
  fromMovies.getMoviesEntities
);

export const getSelectedMovie = createSelector(
  getMoviesEntities,
  fromRoot.getRouterState,
  (entities, router): IMovie => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getAllMovies = createSelector(getMoviesEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(
  getMovieState,
  fromMovies.getMoviesLoaded
);
export const getPizzasLoading = createSelector(
  getMovieState,
  fromMovies.getMoviesLoading
);
