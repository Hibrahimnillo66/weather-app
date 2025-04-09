import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Request {
    type: String
    query: String
    language: String
    unit: String
  }

  type Location {
    name: String
    country: String
    region: String
    lat: String
    lon: String
    timezone_id: String
    localtime: String
    localtime_epoch: Int
    utc_offset: String
  }

  type Condition {
    text: String
    icon: String
  }

  type Current {
    observation_time: String
    temp_c: Float
    condition: Condition
    weather_code: Int
    weather_icons: [String]
    weather_descriptions: [String]
    wind_speed: Int
    wind_kph: Float
    wind_degree: Int
    wind_dir: String
    pressure: Int
    precip: Int
    humidity: Int
    cloudcover: Int
    feelslike: Int
    uv: Int
    visibility: Int
    vis_km: Float
    last_updated: String
    air_quality: AirQuality
  }

  type AirQuality {
    co: String
    no2: String
    o3: String
    so2: String
    pm2_5: String
    pm10: String
    us_epa_index: String
    gb_defra_index: String
  }

  type Astro {
    sunrise: String
    sunset: String
    moonrise: String
    moonset: String
    moon_phase: String
    moon_illumination: String
  }

  type HourlyForecast {
    time: String
    temperature: Int
    wind_speed: Int
    wind_degree: Int
    wind_dir: String
    weather_code: Int
    weather_icons: [String]
    weather_descriptions: [String]
    precip: Int
    humidity: Int
    visibility: Int
    pressure: Int
    cloudcover: Int
    feelslike: Int
    uv_index: Int
  }

  type ForecastDay {
    date: String
    date_epoch: Int
    astro: Astro
    mintemp: Int
    maxtemp: Int
    avgtemp: Int
    totalsnow: Int
    sunhour: Float
    uv_index: Int
    hourly: [HourlyForecast]
  }

  type Forecast {
    forecastday: [ForecastDay]
  }

  type Weather {
    request: Request
    location: Location
    current: Current
    forecast: Forecast
  }

  type Query {
    hello: String
    getWeather(city: String!): Weather
    getForecast(city: String!): Forecast # New query for forecast
  }
`;
