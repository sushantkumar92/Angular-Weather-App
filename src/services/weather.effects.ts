import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as loadActions from '../store/weather.action';
import { loadWeather } from '../store/weather.action';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable()
export class WeatherEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private API_KEY = environment.apiKey;

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActions.loadWeather),
      switchMap(({ city }) =>
        this.http
          .get<any>(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=API_KEY&units=metric`
          ).pipe(
            delay(3000)
          )
          .pipe(
            map((res) =>
              loadActions.loadWeatherSuccess({
                weather: {
                  city: res.name,
                  temperature: res.main.temp,
                  humidity: res.main.humidity,
                  description: res.weather[0].description,
                },
              })
            ),
            catchError((err) =>
              of(
                loadActions.loadWeatherFailure({
                  error: err.message || 'Failed to load the mesage',
                })
              )
            )
          )
      )
    )
  );
}
