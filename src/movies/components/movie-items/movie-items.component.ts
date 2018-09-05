import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {IMovie} from '../../models/movies.model';

@Component({
  selector: 'movie-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie-items.component.html',
  styleUrls: ['movie-items.component.scss']
})
export class MovieItemsComponent {
  @Input() movies: IMovie[];
}
