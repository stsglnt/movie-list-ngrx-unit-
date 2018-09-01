import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {IMovie} from '../../models/movies.model';

@Component({
  selector: 'movie-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['movie-item.component.scss'],
  template: `
    <div  class="movies-container">
      <mat-card class="movie-card" *ngFor="let movie of movies">
        <a [routerLink]="['/movies', movie.id]">
        <mat-card-header class="card-header">
          <mat-card-title><h5>{{movie.name}}</h5></mat-card-title>
        </mat-card-header>
        <img mat-card-image src="../../../assets/movie-covers/{{movie.img}}" alt="Photo of a Shiba Inu">
        <mat-card-content>
        </mat-card-content>
        </a>
      </mat-card>
    </div>
  `,
})
export class MovieItemComponent {
  @Input() movies: IMovie[];
}
