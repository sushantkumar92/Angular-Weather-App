import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSelectors from '../store/weather.selectors';
import * as fromActions from '../store/weather.action';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-weather-app';
  city = '';
  store = inject(Store);
  weather$ = this.store.select(fromSelectors.selectWeather);
  loading$ = this.store.select(fromSelectors.selectLoading);
  error$ = this.store.select(fromSelectors.selectError);
  getWeather() {
    this.store.dispatch(fromActions.loadWeather({ city: this.city }));
  }
}
