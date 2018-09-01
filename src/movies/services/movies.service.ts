import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { IMovie } from '../models/movies.model';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    return this.http
      .get<IMovie[]>(`http://localhost:3004/movies`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
  getGenreMovies(genreType?): Observable<IMovie[]> {
    console.log('genretype from service', genreType);
    const url = genreType ? `http://localhost:3004/movies?genres.${genreType}=true` : `http://localhost:3004/movies`
    return this.http
      .get<IMovie[]>(`http://localhost:3004/movies?genres.${genreType}=true`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

}
