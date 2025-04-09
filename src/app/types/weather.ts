export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    vis_km: number;
    uv: number;
    last_updated: string;
  };
  forecast?: {
    forecastday: {
      astro: {
        sunrise: string;
        sunset: string;
      };
    }[];
  };
}

export interface ForecastData {
  forecastday: {
    date: string;
    date_epoch: number;
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: string;
    };
    mintemp: number;
    maxtemp: number;
    avgtemp: number;
    totalsnow: number;
    sunhour: number;
    uv_index: number;
    hourly: {
      time: string;
      temperature: number;
      wind_speed: number;
      wind_degree: number;
      wind_dir: string;
      weather_code: number;
      weather_icons: string[];
      weather_descriptions: string[];
      precip: number;
      humidity: number;
      visibility: number;
      pressure: number;
      cloudcover: number;
      feelslike: number;
      uv_index: number;
    }[];
  }[];
}