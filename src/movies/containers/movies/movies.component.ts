import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import {IMovie} from '../../models/movies.model';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['movies.component.scss'],
  template: `
    <div class="products">
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

  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit() {
    this.movies$ = this.store.select(fromStore.getAllMovies);
    this.movies$.subscribe(res => console.log('movies', res));
  }
}
