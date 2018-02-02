import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ForecastItem } from '../interfaces/forecast-item.interface'

import * as _ from "lodash";
import * as moment from "moment";

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http
      .get('https://api.openweathermap.org/data/2.5/forecast?id=3027301')
      .map((response: any) => {

        response.list.forEach((element, i) => {
          element.d_txt = element.dt_txt.split(' ')[0];
          element.t_txt = element.dt_txt.split(' ')[1].replace(':00:00', ':00');
          element.calendar_date = moment(element.d_txt, 'YYYY-MM-DD').calendar(null, {
            lastDay: '[Yesterday]',
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            lastWeek: '[last] dddd',
            nextWeek: 'dddd',
            sameElse: 'L'
          });
          if (element.snow) element.snow['3h'] = element.snow['3h'] ? element.snow['3h'] : 0;
        });
        return response.list;
      })
      .catch((err: HttpErrorResponse) => {
        // Log error for now
        console.error('An error occurred loading Open Weather API:', err.message);
        return Observable.throw(new Error('Problem with Open Weather API'));
      })
  }

  getItemsGroupedByDay(): Observable<any> {
    return this.getItems()
      .map((data: ForecastItem) => {
        return _.groupBy(data, 'd_txt');
      })
  }

}
