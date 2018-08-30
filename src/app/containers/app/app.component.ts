import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
  <div class="app">
    <div class="app__header">
      SEARCH BAR
    </div>
    <div class="app__content">
      <div class="app__nav">
        <a routerLink="movies" routerLinkActive="active">Movie list</a>
      </div>
      <div class="app__container">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
})
export class AppComponent {}
