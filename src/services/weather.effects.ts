import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as loadActions from '../store/weather.action';
import { loadWeather } from '../store/weather.action';
import { catchError, delay, map, of, switchMap } from 'rxjs';

@Injectable()
export class WeatherEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActions.loadWeather),
      switchMap(({ city }) =>
        this.http
          .get<any>(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02a96c9844541a7045894c014f059a9a&units=metric`
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
