import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

import { WeatherService } from "./services/weather.service";

import { ForecastItem } from './interfaces/forecast-item.interface'

import * as _ from "lodash";

interface Course {
  description: string;
  courseListIcon: string;
  iconUrl: string;
  longDescription: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public objectKeys = _.keys;

  public forecastGroupedByDay: Object;

  constructor(private http: HttpClient,
              private weatherService: WeatherService) {
    this.forecastGroupedByDay = [];
  }

  ngOnInit() {

    this.weatherService.getItemsGroupedByDay()
      .subscribe((data:Object) => {
        this.forecastGroupedByDay = data;
      })
  }

}
