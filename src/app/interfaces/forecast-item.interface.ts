interface ForecastItemMain {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface ForecastItemWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ForecastItemSnow {
  "3h": string;
}

interface ForecastItemClouds {
  all: number;
}

interface ForecastItemWind {
  speed: number;
  deg: number
}

export interface ForecastItem {
  dt: number;
  main: ForecastItemMain;
  weather: [ForecastItemWeather];
  clouds: ForecastItemClouds;
  wind: ForecastItemWind;
  sys: {
    pod: string
  };
  snow: ForecastItemSnow,
  dt_txt: string
}