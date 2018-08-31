import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';

import {IMovie} from '../../models/movies.model';

@Component({
  selector: 'movie-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['movie-details.component.scss'],
  template: `
    <span class="arrow_back_button" (click)="goBack()"><i class="material-icons">arrow_back</i></span>
    <div  class="movies-container">
      <mat-card class="movie-card">
        <mat-card-header>
          <mat-card-title>{{movieDetails.name}}</mat-card-title>
          <mat-card-subtitle>
            genres: {{movieDetails.genres}}
            length: {{movieDetails.length}}
            rate: {{movieDetails.rate}}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="movie-card-content">
          <div>
           <img mat-card-image src="../../../assets/movie-covers/{{movieDetails.img}}" alt="Photo of a Shiba Inu" style="height: 100%;">
          </div>
          <div style=" margin-left: 40px;">{{movieDetails.description}}</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class MovieDetailsComponent implements OnInit {
  movie$: Observable<IMovie>;
  movieDetails: IMovie;
  visualise$: Observable<IMovie>;

  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit() {
    this.movie$ = this.store.pipe(select(fromStore.getSelectedMovie));
    this.movie$.subscribe(res => this.movieDetails = res);
  }
  goBack() {
    this.store.dispatch(new fromRoot.Back());
  }
}
