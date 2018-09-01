///<reference path="../../../../node_modules/@angular/animations/src/animation_metadata.d.ts"/>
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
  template: `
    <span class="arrow_back_button" (click)="goBack()"><i class="material-icons">arrow_back</i></span>
    <div  class="movies-container"  [@flyInOut]="'in'">
      <mat-card class="movie-card">
        <mat-card-header>
          <mat-card-title  class="movie-title"><h2>{{movieDetails.name}}</h2>
            <star-rating [starType]="'svg'" [hoverEnabled]="true"  [rating]="movieDetails.rate"></star-rating>
          </mat-card-title>
          <mat-card-subtitle>
       
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="movie-card-content">
          <div class="movie-flex-container">
            <div class="flex-left">
             <img mat-card-image src="../../../assets/movie-covers/{{movieDetails.img}}" alt="Photo of a Shiba Inu">
            </div>
            <div style=" margin-left: 40px;" class="flex-right">
              <ul class="info-list">
                <li><i><b>genres:</b></i> {{parseGenres(movieDetails.genres)}}</li>
                <li><i><b>length:</b></i> {{movieDetails.length}}</li>
                <li><i><b>rate:</b></i> {{movieDetails.rate}}</li>
              </ul>
              <p>{{movieDetails.description}}</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
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
    console.log('created');
  }

  ngOnDestroy() {
    console.log('destroyed');
  }
  goBack() {
    this.store.dispatch(new fromRoot.Back());
  }
  parseGenres(genres) {
    return Object.keys(genres);
  }
}
