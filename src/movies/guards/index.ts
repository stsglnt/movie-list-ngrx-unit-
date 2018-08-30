import { MoviesGuard } from './movies.guard';
import { MovieExistsGuard } from './movie-exists.guard';

export const guards: any[] = [MoviesGuard, MovieExistsGuard];

export * from './movies.guard';
export * from './movie-exists.guard';
