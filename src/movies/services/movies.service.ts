import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import { IMovie } from '../models/movies.model';
export const baseUrl = environment.baseUrl;

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<IMovie[]> {
    return this.http
      .get<IMovie[]>(`${baseUrl}/movies`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
  getGenreMovies(genreType?): Observable<IMovie[]> {
    const url = genreType ? `${baseUrl}/movies?genres.${genreType}=true` : `${baseUrl}/movies`;
    return this.http
      .get<IMovie[]>(`${baseUrl}/movies?genres.${genreType}=true`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

}
