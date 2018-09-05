import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';

import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';

import {IMovie} from '../../models/movies.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'movie-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['movie-details.component.scss'],
  templateUrl: 'movie-details.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie$: Observable<IMovie>;
  movieDetails: IMovie;
  visualise$: Observable<IMovie>;

  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit() {
    this.movie$ = this.store.pipe(select(fromStore.getSelectedMovie));
    this.movie$.subscribe(res => this.movieDetails = res);
  }

  ngOnDestroy() {
  }
  goBack() {
    this.store.dispatch(new fromRoot.Back());
  }
  parseGenres(genres) {
    return Object.keys(genres);
  }
}
