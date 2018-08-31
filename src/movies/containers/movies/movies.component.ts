import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as fromStore from '../../store';
import {IMovie} from '../../models/movies.model';
import {genreType} from '../../models/movies';
// 3rd-party libs
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-movies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['movies.component.scss'],
  template: `
    <div class="products">
      <div class="filter">
        <form class="search-form">
          <div class="filter-search">
            <mat-form-field class="search-full-width">
              <input #search matInput placeholder="Search" (input)=searchInputChange$.next(search.value)>
            </mat-form-field>
          </div>
          <div class="filter-select">
            <mat-form-field >
              <mat-select placeholder="Genre" (selectionChange)="onSelectionChange($event)">
                <mat-option *ngFor="let genre of genres" [value]="genre">
                {{genre}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </form>
      </div>
      <div class="products__list">
        <div *ngIf="!((movies$ | async)?.length)">
          No movies has been loaded
        </div>
        <span *ngIf="((movies$ | async)?.length)">
          <movie-item [movies]="movies$ | async">
            
          </movie-item>
       </span>
      </div>
    </div>
  `,
})
export class MoviesComponent implements OnInit {
  movies$: Observable<IMovie[]>;
  genres: any;
  searchInputChange$ = new Subject<string>();

  constructor(private store: Store<fromStore.AppState>) {
    this.searchInputChange$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((text: string) => of(text))
     )
  .subscribe((text: string) => {
    if (text.length !== 0 ) {
        this.store.dispatch(new fromStore.SearchMovies(text));
      } else {
        this.store.dispatch(new fromStore.LoadMovies());
      }
    });
  }

  ngOnInit() {
    this.genres = Object.keys(genreType).map(key => key);
    this.movies$ = this.store.pipe(select(fromStore.getAllMovies));
  }
  onSelectionChange(event) {
    if (event.value !== 'any') {
      this.store.dispatch(new fromStore.LoadMoviesGenre(event.value));
    } else {
      this.store.dispatch(new fromStore.LoadMovies());
    }
  }
}
