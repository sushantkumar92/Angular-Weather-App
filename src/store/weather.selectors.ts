import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWeather from './weather.reducer';
// to select entire state
export const selectWeatherState =
  createFeatureSelector<fromWeather.WeatherState>(
    fromWeather.weatherFeatureKey
  );
// to select individual state
export const selectWeather = createSelector(
  selectWeatherState,
  (state) => state.weather
);

export const selectLoading = createSelector(
  selectWeatherState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectWeatherState,
  (state) => state.error
);
