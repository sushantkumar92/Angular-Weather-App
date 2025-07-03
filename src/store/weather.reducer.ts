import { Weather } from '../model/weather.type';
import * as WeatherActions from './weather.action';
import { createReducer, on } from '@ngrx/store';

export const weatherFeatureKey = 'weather';
export type WeatherState = {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
};

export const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: null,
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeather, (state) => ({
    ...state,
    loading: true,
  })),
  on(WeatherActions.loadWeatherSuccess, (state, { weather }) => ({
    ...state,
    loading: false,
    weather: weather,
  })),
  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
