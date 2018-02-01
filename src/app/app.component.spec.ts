import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { WeatherService } from './services/weather.service';
import { WeatherIntercepterService } from './services/weather-intercepter.service';
import { ForecastDayComponent } from './components/forecast-day/forecast-day.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ForecastDayComponent
      ],
      imports: [
        MatCardModule,
        MatTabsModule,
        HttpClientModule
      ],  providers: [
        WeatherService,
        [{ provide: HTTP_INTERCEPTORS, useClass: WeatherIntercepterService, multi: true }]
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('h1')[0].textContent).toContain('Chamonix 5 day weather forecast');
  }));
});