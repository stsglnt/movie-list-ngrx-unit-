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
      <div class="movie-item" *ngFor="let movie of movies">
        <a [routerLink]="['/movies', movie.id]">
          <h4>{{ movie.name}}</h4>
          <!--<button type="button" class="btn btn__ok">-->
            <!--View more-->
          <!--</button>-->
        </a>
      </div>
    </div>
  `,
})
export class MovieItemComponent {
  @Input() movies: IMovie[];
}
