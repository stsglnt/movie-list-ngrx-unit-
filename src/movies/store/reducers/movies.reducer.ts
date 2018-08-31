import * as fromMovies from '../actions/movies.action';
import { IMovie } from '../../models/movies.model';
import {MoviesAction} from '../actions/movies.action';
import memoizeOne from 'memoize-one';

export interface MovieState {
  entities: { [id: number]: IMovie };
  loaded: boolean;
  loading: boolean;
}

export const initialState: MovieState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromMovies.MoviesAction
): MovieState {
  switch (action.type) {
    case fromMovies.LOAD_MOVIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromMovies.LOAD_MOVIES_GENRE_SUCCESS: {
      const movies = action.payload;
      const entities = movies.reduce(
        (entities: { [id: number]: IMovie }, movie: IMovie) => {
          return {
            ...entities,
            [movie.id]: movie,
          };
        },
        {  }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromMovies.LOAD_MOVIES_SUCCESS: {
    const movies = action.payload;
      const entities = movies.reduce(
        (entities: { [id: number]: IMovie }, movie: IMovie) => {
          return {
            ...entities,
            [movie.id]: movie,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }
    case fromMovies.SEARCH_MOVIES_SUCCESS: {
    const query = action.payload.query;
      const movies = memoizedSearch(query, action.payload.movies);
      const entities = movies.reduce(
        (entities: { [id: number]: IMovie }, movie: IMovie) => {
          return {
            ...entities,
            [movie.id]: movie,
          };
        },
        {
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromMovies.LOAD_MOVIES_GENRE_FAIL:
    case fromMovies.LOAD_MOVIES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

  }

  return state;
}

export const getMoviesEntities = (state: MovieState) => state.entities;
export const getMoviesLoading = (state: MovieState) => state.loading;
export const getMoviesLoaded = (state: MovieState) => state.loaded;

export function filterByQuery(searchQuery, movies) {
  const query = searchQuery.toLowerCase();
  // const movies = Object.keys(movieEntities).map( id => movieEntities[parseInt(id, 10)]);

  return movies.filter((movie) => {
    const movieName = movie.name.toLowerCase();
    return movieName.includes(query);
  });
}
export const memoizedSearch = memoizeOne(filterByQuery);
