import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatListModule, MatDividerModule, MatDivider, MatCardModule, MatTableModule } from '@angular/material';

/* Services */
import { WeatherService } from './services/weather.service';
import { WeatherIntercepterService } from './services/weather-intercepter.service';

/* Components */
import { AppComponent } from './app.component';
import { ForecastDayComponent } from './components/forecast-day/forecast-day.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastDayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule
  ],
  providers: [
    WeatherService,
    [{ provide: HTTP_INTERCEPTORS, useClass: WeatherIntercepterService, multi: true }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
