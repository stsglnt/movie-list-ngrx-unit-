import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
  <div class="app">
    <div class="app__header">
    
      <img src="../../../assets/logo-2.png" alt="">
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
export class AppComponent {
  constructor() {
  }

}
