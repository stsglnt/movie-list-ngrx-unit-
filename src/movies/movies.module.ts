import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';
import {MaterialModule} from '../app/material.module';
import {StarRatingConfigService, StarRatingModule} from 'angular-star-rating';
import {CustomConfigService} from './services/star.service';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.MoviesGuard],
    component: fromContainers.MoviesComponent,
  },
  {
    path: ':movieId',
    canActivate: [fromGuards.MovieExistsGuard],
    component: fromContainers.MovieDetailsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('movies', reducers),
    EffectsModule.forFeature(effects),
    MaterialModule,
    FormsModule,
    StarRatingModule.forRoot()

  ],
  providers: [...fromServices.services, ...fromGuards.guards,
    {
      provide: StarRatingConfigService, useClass: CustomConfigService
    }],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class MoviesModule {}
