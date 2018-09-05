import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';

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
  templateUrl: 'movies.component.html',
})
export class MoviesComponent implements OnInit {
  movies$: Observable<IMovie[]>;
  genres: any;
  currentGenre: string;
  searchInputChange$ = new Subject<string>();
  searchInput;
  constructor(private store: Store<fromStore.AppState>) {
    this.searchInputChange$.pipe(
      debounceTime(500),
      switchMap((text: string) => of(text))
     )
  .subscribe((query: string) => {
    // dispatch with selected genre and then run LoadGenre insted of LoadMovies
    if (query.length !== 0 ) {
        this.store.dispatch(new fromStore.SearchMovies({query, currentGenre: this.currentGenre}));
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
    this.currentGenre = event.value;
    this.searchInput = '';
    if (event.value !== 'any') {
      this.store.dispatch(new fromStore.LoadMoviesGenre(event.value));
    } else {
      this.store.dispatch(new fromStore.LoadMovies());
    }
  }
}
