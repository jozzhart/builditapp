import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import * as _ from 'lodash';

describe('WeatherService', () => {

  let weatherService;
  let httpMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    weatherService = TestBed.get(WeatherService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('getItems should return an observalbe array of forecast items', (done: DoneFn) => {

    weatherService.getItems()
      .subscribe(value => {
        expect(value).not.toEqual(weatherAPIResponse.list)
        done();
      });

    const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/forecast?id=3027301`);
    expect(req.request.method).toBe("GET");
    req.flush(_.cloneDeep(weatherAPIResponse));

  });

  it('getItemsGroupedByDay should return an observalbe array of forecast items grouped by day', (done: DoneFn) => {

    weatherService.getItemsGroupedByDay()
      .subscribe(value => {
        expect(value['2018-01-31'].length).toEqual(4);
        expect(value['2018-02-01'].length).toEqual(8);

        //  THe service addes some attributes to the original object. This could be tested further
        expect(value['2018-01-31'][0]).not.toEqual(weatherAPIResponse.list[0]);
        done();
      });

    const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/forecast?id=3027301`);
    expect(req.request.method).toBe("GET");
    req.flush(_.cloneDeep(weatherAPIResponse));

  });

  afterEach(() => {
    httpMock.verify();
  });

});

const weatherAPIResponse = { "cod": "200", "message": 0.0056, "cnt": 40, "list": [{ "dt": 1517400000, "main": { "temp": 8.99, "temp_min": 5.24, "temp_max": 8.99, "pressure": 904.13, "sea_level": 1034.36, "grnd_level": 904.13, "humidity": 70, "temp_kf": 3.75 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "02d" }], "clouds": { "all": 8 }, "wind": { "speed": 0.81, "deg": 254.007 }, "sys": { "pod": "d" }, "dt_txt": "2018-01-31 12:00:00" }, { "dt": 1517410800, "main": { "temp": 9.63, "temp_min": 6.82, "temp_max": 9.63, "pressure": 901.22, "sea_level": 1030.47, "grnd_level": 901.22, "humidity": 65, "temp_kf": 2.81 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 0 }, "wind": { "speed": 1.11, "deg": 210.001 }, "sys": { "pod": "d" }, "dt_txt": "2018-01-31 15:00:00" }, { "dt": 1517421600, "main": { "temp": 5.45, "temp_min": 3.58, "temp_max": 5.45, "pressure": 899.67, "sea_level": 1028.87, "grnd_level": 899.67, "humidity": 66, "temp_kf": 1.87 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "02n" }], "clouds": { "all": 8 }, "wind": { "speed": 1.97, "deg": 211.003 }, "sys": { "pod": "n" }, "dt_txt": "2018-01-31 18:00:00" }, { "dt": 1517432400, "main": { "temp": 4.55, "temp_min": 3.61, "temp_max": 4.55, "pressure": 897.73, "sea_level": 1027.15, "grnd_level": 897.73, "humidity": 67, "temp_kf": 0.94 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 80 }, "wind": { "speed": 2.51, "deg": 211 }, "rain": { "3h": 0.04 }, "sys": { "pod": "n" }, "dt_txt": "2018-01-31 21:00:00" }, { "dt": 1517443200, "main": { "temp": 1.1, "temp_min": 1.1, "temp_max": 1.1, "pressure": 895.99, "sea_level": 1025.85, "grnd_level": 895.99, "humidity": 93, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 92 }, "wind": { "speed": 2.06, "deg": 210 }, "rain": { "3h": 2.4 }, "snow": { "3h": 0.8525 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-01 00:00:00" }, { "dt": 1517454000, "main": { "temp": 0.34, "temp_min": 0.34, "temp_max": 0.34, "pressure": 893.85, "sea_level": 1023.78, "grnd_level": 893.85, "humidity": 96, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 92 }, "wind": { "speed": 1.52, "deg": 218.51 }, "rain": { "3h": 0.835 }, "snow": { "3h": 4.87375 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-01 03:00:00" }, { "dt": 1517464800, "main": { "temp": 0.07, "temp_min": 0.07, "temp_max": 0.07, "pressure": 892.97, "sea_level": 1022.7, "grnd_level": 892.97, "humidity": 95, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "clouds": { "all": 92 }, "wind": { "speed": 1.25, "deg": 220.501 }, "rain": { "3h": 0.02 }, "snow": { "3h": 5.97745 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-01 06:00:00" }, { "dt": 1517475600, "main": { "temp": 0.02, "temp_min": 0.02, "temp_max": 0.02, "pressure": 892.51, "sea_level": 1022.24, "grnd_level": 892.51, "humidity": 93, "temp_kf": 0 }, "weather": [{ "id": 601, "main": "Snow", "description": "snow", "icon": "13d" }], "clouds": { "all": 92 }, "wind": { "speed": 0.86, "deg": 255.5 }, "rain": {}, "snow": { "3h": 4.0588 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-01 09:00:00" }, { "dt": 1517486400, "main": { "temp": 0.77, "temp_min": 0.77, "temp_max": 0.77, "pressure": 890.93, "sea_level": 1020.1, "grnd_level": 890.93, "humidity": 82, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13d" }], "clouds": { "all": 76 }, "wind": { "speed": 0.76, "deg": 262 }, "rain": {}, "snow": { "3h": 0.83 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-01 12:00:00" }, { "dt": 1517497200, "main": { "temp": -0.14, "temp_min": -0.14, "temp_max": -0.14, "pressure": 889.62, "sea_level": 1018.91, "grnd_level": 889.62, "humidity": 87, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": { "all": 92 }, "wind": { "speed": 0.82, "deg": 277.501 }, "rain": { "3h": 0.0049999999999999 }, "snow": { "3h": 2.0325 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-01 15:00:00" }, { "dt": 1517508000, "main": { "temp": -1.07, "temp_min": -1.07, "temp_max": -1.07, "pressure": 890.15, "sea_level": 1019.91, "grnd_level": 890.15, "humidity": 93, "temp_kf": 0 }, "weather": [{ "id": 601, "main": "Snow", "description": "snow", "icon": "13n" }], "clouds": { "all": 88 }, "wind": { "speed": 0.82, "deg": 275.501 }, "rain": {}, "snow": { "3h": 2.9075 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-01 18:00:00" }, { "dt": 1517518800, "main": { "temp": -1.61, "temp_min": -1.61, "temp_max": -1.61, "pressure": 889.86, "sea_level": 1019.86, "grnd_level": 889.86, "humidity": 94, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13n" }], "clouds": { "all": 88 }, "wind": { "speed": 0.67, "deg": 296.003 }, "rain": {}, "snow": { "3h": 1.0525 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-01 21:00:00" }, { "dt": 1517529600, "main": { "temp": -2.33, "temp_min": -2.33, "temp_max": -2.33, "pressure": 889.58, "sea_level": 1019.82, "grnd_level": 889.58, "humidity": 94, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13n" }], "clouds": { "all": 80 }, "wind": { "speed": 0.62, "deg": 251.004 }, "rain": {}, "snow": { "3h": 0.7125 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-02 00:00:00" }, { "dt": 1517540400, "main": { "temp": -3.13, "temp_min": -3.13, "temp_max": -3.13, "pressure": 889.31, "sea_level": 1019.8, "grnd_level": 889.31, "humidity": 94, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13n" }], "clouds": { "all": 88 }, "wind": { "speed": 0.46, "deg": 252.502 }, "rain": {}, "snow": { "3h": 0.33 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-02 03:00:00" }, { "dt": 1517551200, "main": { "temp": -3.32, "temp_min": -3.32, "temp_max": -3.32, "pressure": 889.3, "sea_level": 1019.84, "grnd_level": 889.3, "humidity": 92, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13n" }], "clouds": { "all": 92 }, "wind": { "speed": 0.71, "deg": 292.001 }, "rain": {}, "snow": { "3h": 0.3525 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-02 06:00:00" }, { "dt": 1517562000, "main": { "temp": -2.73, "temp_min": -2.73, "temp_max": -2.73, "pressure": 889.46, "sea_level": 1020.1, "grnd_level": 889.46, "humidity": 91, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13d" }], "clouds": { "all": 88 }, "wind": { "speed": 0.95, "deg": 300.001 }, "rain": {}, "snow": { "3h": 0.515 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-02 09:00:00" }, { "dt": 1517572800, "main": { "temp": -2.13, "temp_min": -2.13, "temp_max": -2.13, "pressure": 889.29, "sea_level": 1019.12, "grnd_level": 889.29, "humidity": 84, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13d" }], "clouds": { "all": 80 }, "wind": { "speed": 1.06, "deg": 317.503 }, "rain": {}, "snow": { "3h": 0.84 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-02 12:00:00" }, { "dt": 1517583600, "main": { "temp": -2.55, "temp_min": -2.55, "temp_max": -2.55, "pressure": 889.24, "sea_level": 1018.93, "grnd_level": 889.24, "humidity": 79, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13d" }], "clouds": { "all": 80 }, "wind": { "speed": 0.96, "deg": 316.502 }, "rain": {}, "snow": { "3h": 0.3375 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-02 15:00:00" }, { "dt": 1517594400, "main": { "temp": -4.93, "temp_min": -4.93, "temp_max": -4.93, "pressure": 890.17, "sea_level": 1020.45, "grnd_level": 890.17, "humidity": 87, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13n" }], "clouds": { "all": 12 }, "wind": { "speed": 0.76, "deg": 256.503 }, "rain": {}, "snow": { "3h": 0.067499999999999 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-02 18:00:00" }, { "dt": 1517605200, "main": { "temp": -6.75, "temp_min": -6.75, "temp_max": -6.75, "pressure": 889.48, "sea_level": 1020.17, "grnd_level": 889.48, "humidity": 93, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13n" }], "clouds": { "all": 88 }, "wind": { "speed": 0.93, "deg": 171.501 }, "rain": {}, "snow": { "3h": 0.57 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-02 21:00:00" }, { "dt": 1517616000, "main": { "temp": -5.4, "temp_min": -5.4, "temp_max": -5.4, "pressure": 889.33, "sea_level": 1020.21, "grnd_level": 889.33, "humidity": 90, "temp_kf": 0 }, "weather": [{ "id": 601, "main": "Snow", "description": "snow", "icon": "13n" }], "clouds": { "all": 88 }, "wind": { "speed": 0.86, "deg": 178.011 }, "rain": {}, "snow": { "3h": 1.8075 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-03 00:00:00" }, { "dt": 1517626800, "main": { "temp": -5.19, "temp_min": -5.19, "temp_max": -5.19, "pressure": 889.73, "sea_level": 1020.69, "grnd_level": 889.73, "humidity": 89, "temp_kf": 0 }, "weather": [{ "id": 601, "main": "Snow", "description": "snow", "icon": "13n" }], "clouds": { "all": 88 }, "wind": { "speed": 0.83, "deg": 174 }, "rain": {}, "snow": { "3h": 1.5125 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-03 03:00:00" }, { "dt": 1517637600, "main": { "temp": -5.05, "temp_min": -5.05, "temp_max": -5.05, "pressure": 890.38, "sea_level": 1021.77, "grnd_level": 890.38, "humidity": 92, "temp_kf": 0 }, "weather": [{ "id": 601, "main": "Snow", "description": "snow", "icon": "13n" }], "clouds": { "all": 88 }, "wind": { "speed": 0.86, "deg": 292.5 }, "rain": {}, "snow": { "3h": 1.535 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-03 06:00:00" }, { "dt": 1517648400, "main": { "temp": -3.92, "temp_min": -3.92, "temp_max": -3.92, "pressure": 892.42, "sea_level": 1023.86, "grnd_level": 892.42, "humidity": 90, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13d" }], "clouds": { "all": 68 }, "wind": { "speed": 0.88, "deg": 291.003 }, "rain": {}, "snow": { "3h": 1.0225 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-03 09:00:00" }, { "dt": 1517659200, "main": { "temp": -2.76, "temp_min": -2.76, "temp_max": -2.76, "pressure": 893.17, "sea_level": 1023.89, "grnd_level": 893.17, "humidity": 75, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13d" }], "clouds": { "all": 36 }, "wind": { "speed": 0.97, "deg": 277.502 }, "rain": {}, "snow": { "3h": 0.079999999999998 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-03 12:00:00" }, { "dt": 1517670000, "main": { "temp": -3.02, "temp_min": -3.02, "temp_max": -3.02, "pressure": 892.89, "sea_level": 1023.59, "grnd_level": 892.89, "humidity": 70, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 68 }, "wind": { "speed": 0.96, "deg": 260.5 }, "rain": {}, "snow": { "3h": 0.012500000000003 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-03 15:00:00" }, { "dt": 1517680800, "main": { "temp": -8.14, "temp_min": -8.14, "temp_max": -8.14, "pressure": 892.66, "sea_level": 1023.89, "grnd_level": 892.66, "humidity": 91, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 0 }, "wind": { "speed": 0.77, "deg": 151.005 }, "rain": {}, "snow": { "3h": 0.0049999999999955 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-03 18:00:00" }, { "dt": 1517691600, "main": { "temp": -9.26, "temp_min": -9.26, "temp_max": -9.26, "pressure": 892.24, "sea_level": 1023.96, "grnd_level": 892.24, "humidity": 75, "temp_kf": 0 }, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "clouds": { "all": 48 }, "wind": { "speed": 1.06, "deg": 130.001 }, "rain": {}, "snow": {}, "sys": { "pod": "n" }, "dt_txt": "2018-02-03 21:00:00" }, { "dt": 1517702400, "main": { "temp": -7.17, "temp_min": -7.17, "temp_max": -7.17, "pressure": 892.04, "sea_level": 1024.09, "grnd_level": 892.04, "humidity": 68, "temp_kf": 0 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "clouds": { "all": 68 }, "wind": { "speed": 0.86, "deg": 112 }, "rain": {}, "snow": {}, "sys": { "pod": "n" }, "dt_txt": "2018-02-04 00:00:00" }, { "dt": 1517713200, "main": { "temp": -7.23, "temp_min": -7.23, "temp_max": -7.23, "pressure": 892.03, "sea_level": 1024.28, "grnd_level": 892.03, "humidity": 72, "temp_kf": 0 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "clouds": { "all": 56 }, "wind": { "speed": 0.72, "deg": 96.0005 }, "rain": {}, "snow": {}, "sys": { "pod": "n" }, "dt_txt": "2018-02-04 03:00:00" }, { "dt": 1517724000, "main": { "temp": -7.37, "temp_min": -7.37, "temp_max": -7.37, "pressure": 892.31, "sea_level": 1024.98, "grnd_level": 892.31, "humidity": 69, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 76 }, "wind": { "speed": 0.72, "deg": 95.0032 }, "rain": {}, "snow": { "3h": 0.0025000000000048 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-04 06:00:00" }, { "dt": 1517734800, "main": { "temp": -5.18, "temp_min": -5.18, "temp_max": -5.18, "pressure": 893.37, "sea_level": 1025.99, "grnd_level": 893.37, "humidity": 72, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 64 }, "wind": { "speed": 0.87, "deg": 87.5014 }, "rain": {}, "snow": { "3h": 0.0075000000000003 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-04 09:00:00" }, { "dt": 1517745600, "main": { "temp": -1.78, "temp_min": -1.78, "temp_max": -1.78, "pressure": 894.36, "sea_level": 1026.48, "grnd_level": 894.36, "humidity": 69, "temp_kf": 0 }, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "clouds": { "all": 44 }, "wind": { "speed": 1.05, "deg": 2.00143 }, "rain": {}, "snow": {}, "sys": { "pod": "d" }, "dt_txt": "2018-02-04 12:00:00" }, { "dt": 1517756400, "main": { "temp": -2.12, "temp_min": -2.12, "temp_max": -2.12, "pressure": 895.11, "sea_level": 1027.29, "grnd_level": 895.11, "humidity": 71, "temp_kf": 0 }, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "clouds": { "all": 32 }, "wind": { "speed": 1.01, "deg": 355.502 }, "rain": {}, "snow": {}, "sys": { "pod": "d" }, "dt_txt": "2018-02-04 15:00:00" }, { "dt": 1517767200, "main": { "temp": -7.33, "temp_min": -7.33, "temp_max": -7.33, "pressure": 896.89, "sea_level": 1029.8, "grnd_level": 896.89, "humidity": 94, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "02n" }], "clouds": { "all": 8 }, "wind": { "speed": 1, "deg": 22.5003 }, "rain": {}, "snow": {}, "sys": { "pod": "n" }, "dt_txt": "2018-02-04 18:00:00" }, { "dt": 1517778000, "main": { "temp": -11.24, "temp_min": -11.24, "temp_max": -11.24, "pressure": 898, "sea_level": 1031.53, "grnd_level": 898, "humidity": 94, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 0 }, "wind": { "speed": 0.82, "deg": 56.5021 }, "rain": {}, "snow": {}, "sys": { "pod": "n" }, "dt_txt": "2018-02-04 21:00:00" }, { "dt": 1517788800, "main": { "temp": -12.26, "temp_min": -12.26, "temp_max": -12.26, "pressure": 898.94, "sea_level": 1032.81, "grnd_level": 898.94, "humidity": 96, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 20 }, "wind": { "speed": 0.75, "deg": 68.5034 }, "rain": {}, "snow": { "3h": 0.0075000000000003 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-05 00:00:00" }, { "dt": 1517799600, "main": { "temp": -11.9, "temp_min": -11.9, "temp_max": -11.9, "pressure": 899.34, "sea_level": 1033.61, "grnd_level": 899.34, "humidity": 88, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 48 }, "wind": { "speed": 0.78, "deg": 70.5049 }, "rain": {}, "snow": { "3h": 0.022500000000001 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-05 03:00:00" }, { "dt": 1517810400, "main": { "temp": -10.91, "temp_min": -10.91, "temp_max": -10.91, "pressure": 899.73, "sea_level": 1034.29, "grnd_level": 899.73, "humidity": 92, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13n" }], "clouds": { "all": 24 }, "wind": { "speed": 0.79, "deg": 54.5003 }, "rain": {}, "snow": { "3h": 0.032499999999999 }, "sys": { "pod": "n" }, "dt_txt": "2018-02-05 06:00:00" }, { "dt": 1517821200, "main": { "temp": -7.73, "temp_min": -7.73, "temp_max": -7.73, "pressure": 900.48, "sea_level": 1035.02, "grnd_level": 900.48, "humidity": 89, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 8 }, "wind": { "speed": 1.06, "deg": 46.0005 }, "rain": {}, "snow": { "3h": 0.015000000000001 }, "sys": { "pod": "d" }, "dt_txt": "2018-02-05 09:00:00" }], "city": { "id": 3027301, "name": "Chamonix-Mont-Blanc", "coord": { "lat": 45.9238, "lon": 6.8693 }, "country": "FR" } }