import { Component, OnInit, Input } from '@angular/core';

import { ForecastItem } from '../../interfaces/forecast-item.interface'

@Component({
  selector: 'app-forecast-day',
  templateUrl: './forecast-day.component.html',
  styleUrls: ['./forecast-day.component.css']
})
export class ForecastDayComponent implements OnInit {
  @Input() day: Array<ForecastItem>;
  constructor() { }

  ngOnInit() {}

}