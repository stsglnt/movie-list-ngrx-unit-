import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

import {IMovie} from '../../models/movies.model';

@Component({
  selector: 'movie-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['movie-details.component.scss'],
  template: `
    <div 
      class="product-item">
      <span>film details</span>
    </div>
  `,
})
export class MovieDetailsComponent implements OnInit {
  movie$: Observable<IMovie>;
  visualise$: Observable<IMovie>;

  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit() {
    this.movie$ = this.store.select(fromStore.getSelectedMovie);
  }
}
