import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import {EMPTY, Observable, of} from 'rxjs';

import { MoviesService } from '../../services/movies.service';
import * as fromEffects from './movies.effect';
import * as fromActions from '../actions/movies.action';

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('MoviesEffects', () => {
  let actions$: TestActions;
  let service: MoviesService;
  let effects: fromEffects.MoviesEffects;

  const movies = [
    {
      "id": 1,
      "key": "deadpool",
      "name": "Deadpool",
      "description": "A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers, adopting the alter ego Deadpool.",
      "genres": ["action", "adventure", "comedy"],
      "rate": "8.6",
      "length": "1hr 48mins",
      "img": "deadpool.jpg"
    },
    {
      "id": 2,
      "key": "we-are-the-millers",
      "name": "We\"re the Millers",
      "description": "A veteran pot dealer creates a fake family as part of his plan to move a huge shipment of weed into the U.S. from Mexico.",
      "genres": ["adventure", "comedy", "crime"],
      "rate": "7.0",
      "length": "1hr 50mins",
      "img": "we-are-the-millers.jpg"
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MoviesService,
        fromEffects.MoviesEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(MoviesService);
    effects = TestBed.get(fromEffects.MoviesEffects);

    spyOn(service, 'getMovies').and.returnValue(of(movies));
  });

  describe('loadMovies', () => {
    it('should return a collection from LoadMoviesSuccess', () => {
      const action = new fromActions.LoadMovies();
      const completion = new fromActions.LoadMoviesSuccess(movies);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadMovies$).toBeObservable(expected);
    });
  });
});
