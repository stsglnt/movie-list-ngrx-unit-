import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {select, Store} from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { IMovie } from '../models/movies.model';

@Injectable()
export class MovieExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.movieId, 10);
        return this.hasMovie(id);
      })
    );
  }

  hasMovie(id: number): Observable<boolean> {
    return this.store.pipe(select(fromStore.getMoviesEntities))
      .pipe(
        map((entities: { [key: number]: IMovie }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getMoviesLoaded)).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadMovies());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
