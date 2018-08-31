import {StoreModule, Store, combineReducers, select} from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import { TestBed } from '@angular/core/testing';
import { IMovie } from '../../models/movies.model';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from './movies.selectors';

describe('Movies Selectors', () => {
  let store: Store<fromReducers.AppState>;

  const movie1: IMovie = {
    "id": 1,
    "key": "deadpool",
    "name": "Deadpool",
    "description": "A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers, adopting the alter ego Deadpool.",
    "genres": ["action", "adventure", "comedy"],
    "rate": "8.6",
    "length": "1hr 48mins",
    "img": "deadpool.jpg"
  };

  const movie2: IMovie = {
    "id": 2,
    "key": "we-are-the-millers",
    "name": "We\"re the Millers",
    "description": "A veteran pot dealer creates a fake family as part of his plan to move a huge shipment of weed into the U.S. from Mexico.",
    "genres": ["adventure", "comedy", "crime"],
    "rate": "7.0",
    "length": "1hr 50mins",
    "img": "we-are-the-millers.jpg"
  };

  const movie3: IMovie = {
    "id": 3,
    "key": "straight-outta-compton",
    "name": "Straight Outta Compton",
    "description": "The group NWA emerges from the mean streets of Compton in Los Angeles, California, in the mid-1980s and revolutionizes Hip Hop culture with their music and tales about life in the hood.",
    "genres": ["biography", "drama", "history"],
    "rate": "8.0",
    "length": "2hr 27mins",
    "img": "straight-outta-compton.jpg"
  };

  const movies: IMovie[] = [movie1, movie2, movie3];

  const entities = {
    1: movies[0],
    2: movies[1],
    3: movies[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          movies: combineReducers(fromReducers.reducers),
        }),
      ],
    });

    store = TestBed.get(Store);
  });

  describe('getMovieState', () => {
    it('should return state of movie store slice', () => {
      let result;
      store.pipe(select(fromSelectors.getMovieState))
        .subscribe(value => (result = value));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false,
      });

      store.dispatch(new fromActions.LoadMoviesSuccess(movies));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false,
      });
    });
  });

  describe('getMovieEntities', () => {
    it('should return movies as entities', () => {
      let result;

      store.pipe(select(fromSelectors.getMoviesEntities))
        .subscribe(value => result = value );

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadMoviesSuccess(movies));

      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedMovie', () => {
    it('should return selected movie as an entity', () => {
      let result;
      let params;

      store.dispatch(new fromActions.LoadMoviesSuccess(movies));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/movies',
            queryParams: {},
            params: { movieId: '2' },
          },
          event: {},
        },
      });

      store.pipe(select(fromRoot.getRouterState))
        .subscribe(routerState => (params = routerState.state.params));

      expect(params).toEqual({ movieId: '2' });

      store.pipe(select(fromSelectors.getSelectedMovie))
        .subscribe(selectedMovie => (result = selectedMovie));

      expect(result).toEqual(entities[2]);
    });
  });


  describe('getAllMovies', () => {
    it('should return movies as an array', () => {
      let result;

      store.pipe(select(fromSelectors.getAllMovies))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadMoviesSuccess(movies));

      expect(result).toEqual(movies);
    });
  });

  describe('getMoviesLoaded', () => {
    it('should return the movies loaded state', () => {
      let result;

      store.pipe(select(fromSelectors.getMoviesLoaded))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadMoviesSuccess([]));

      expect(result).toEqual(true);
    });
  });

  describe('getMoviesLoading', () => {
    it('should return the movies loading state', () => {
      let result;

      store.pipe(select(fromSelectors.getMoviesLoading))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadMovies());

      expect(result).toEqual(true);
    });
  });
});
