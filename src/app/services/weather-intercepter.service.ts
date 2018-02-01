import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherIntercepterService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if it's a request to openweather
    if(!req.url.includes('openweathermap')) return next.handle(req);

    const clonedRequest = req.clone({
      url: `${req.url}&APPID=${environment.openWeatherKey}&units=metric`
    });
    return next.handle(clonedRequest);
  }
}



