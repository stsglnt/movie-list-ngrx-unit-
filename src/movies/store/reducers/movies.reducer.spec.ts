import * as fromMovies from './movies.reducer';
import * as fromActions from '../actions/movies.action';
import { IMovie } from '../../models/movies.model';

describe('MoviesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromMovies;
      const action = {} as any;
      const state = fromMovies.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_MOVIES action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromMovies;
      const action = new fromActions.LoadMovies();
      const state = fromMovies.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('LOAD_MOVIES_SUCCESS action', () => {
    it('should create entity', () => {
      const movies: IMovie[] = [
        {
          "id": 1,
          "key": "we-are-the-millers",
          "name": "We\"re the Millers",
          "description": "A veteran pot dealer creates a fake family as part of his plan to move a huge shipment of weed into the U.S. from Mexico.",
          "genres": ["adventure", "comedy", "crime"],
          "rate": "7.0",
          "length": "1hr 50mins",
          "img": "we-are-the-millers.jpg"
        },
        {
          "id": 2,
          "key": "straight-outta-compton",
          "name": "Straight Outta Compton",
          "description": "The group NWA emerges from the mean streets of Compton in Los Angeles, California, in the mid-1980s and revolutionizes Hip Hop culture with their music and tales about life in the hood.",
          "genres": ["biography", "drama", "history"],
          "rate": "8.0",
          "length": "2hr 27mins",
          "img": "straight-outta-compton.jpg"
        },
      ];
      const entities = {
        1: movies[0],
        2: movies[1],
      };
      const { initialState } = fromMovies;
      const action = new fromActions.LoadMoviesSuccess(movies);
      const state = fromMovies.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_MOVIES_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromMovies;
      const action = new fromActions.LoadMoviesFail({});
      const state = fromMovies.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const { initialState } = fromMovies;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadMoviesFail({});
      const state = fromMovies.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });
});

describe('MoviesReducer Selectors', () => {
  describe('getMoviesEntities', () => {
    it('should return .entities', () => {
      const entities: { [key: number]: IMovie } = {
        1: {
          "id": 1,
          "key": "we-are-the-millers",
          "name": "We\"re the Millers",
          "description": "A veteran pot dealer creates a fake family as part of his plan to move a huge shipment of weed into the U.S. from Mexico.",
          "genres": ["adventure", "comedy", "crime"],
          "rate": "7.0",
          "length": "1hr 50mins",
          "img": "we-are-the-millers.jpg"
        },
      2: {
        "id": 2,
        "key": "straight-outta-compton",
        "name": "Straight Outta Compton",
        "description": "The group NWA emerges from the mean streets of Compton in Los Angeles, California, in the mid-1980s and revolutionizes Hip Hop culture with their music and tales about life in the hood.",
        "genres": ["biography", "drama", "history"],
        "rate": "8.0",
        "length": "2hr 27mins",
        "img": "straight-outta-compton.jpg"
      },
      };
      const { initialState } = fromMovies;
      const previousState = { ...initialState, entities };
      const slice = fromMovies.getMoviesEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });

  describe('getMoviesLoading', () => {
    it('should return .loading', () => {
      const { initialState } = fromMovies;
      const previousState = { ...initialState, loading: true };
      const slice = fromMovies.getMoviesLoading(previousState);

      expect(slice).toEqual(true);
    });
  });

  describe('getMoviesLoaded', () => {
    it('should return .loaded', () => {
      const { initialState } = fromMovies;
      const previousState = { ...initialState, loaded: true };
      const slice = fromMovies.getMoviesLoaded(previousState);

      expect(slice).toEqual(true);
    });
  });
});
