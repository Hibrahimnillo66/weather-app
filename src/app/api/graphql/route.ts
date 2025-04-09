import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import axios from "axios";
import { weatherMock } from "@/app/mocks/weatherMocks";

// Definir tipos para los argumentos
type WeatherArgs = {
  city: string;
};

const typeDefs = gql`
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

const resolvers = {
  Query: {
    hello: () => "¡Hola desde GraphQL con App Router!",
    getWeather: async (_: unknown, { city }: WeatherArgs) => {
      const apiKey = process.env.WEATHERSTACK_API_KEY;
      if (!apiKey) throw new Error("Falta la API Key en .env.local");

      const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=m`;

      try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.error) {
          throw new Error(data.error.info || "Error en la API");
        }

        return {
          request: {
            type: data.request.type,
            query: data.request.query,
            language: data.request.language,
            unit: data.request.unit,
          },
          location: {
            name: data.location.name,
            country: data.location.country,
            region: data.location.region,
            lat: data.location.lat,
            lon: data.location.lon,
            timezone_id: data.location.timezone_id,
            localtime: data.location.localtime,
            localtime_epoch: data.location.localtime_epoch,
            utc_offset: data.location.utc_offset,
          },
          current: {
            observation_time: data.current.observation_time,
            temp_c: data.current.temperature, // Map temperature to temp_c
            condition: {
              text: data.current.weather_descriptions[0],
              icon: data.current.weather_icons[0],
            },
            weather_code: data.current.weather_code,
            weather_icons: data.current.weather_icons,
            weather_descriptions: data.current.weather_descriptions,
            wind_speed: data.current.wind_speed,
            wind_kph: data.current.wind_speed,
            wind_degree: data.current.wind_degree,
            wind_dir: data.current.wind_dir,
            pressure: data.current.pressure,
            precip: data.current.precip,
            humidity: data.current.humidity,
            cloudcover: data.current.cloudcover,
            feelslike: data.current.feelslike,
            uv: data.current.uv_index,
            visibility: data.current.visibility,
            vis_km: data.current.visibility,
            last_updated: data.current.observation_time, // Map observation_time to last_updated
            air_quality: {
              co: data.current.air_quality?.co,
              no2: data.current.air_quality?.no2,
              o3: data.current.air_quality?.o3,
              so2: data.current.air_quality?.so2,
              pm2_5: data.current.air_quality?.pm2_5,
              pm10: data.current.air_quality?.pm10,
              us_epa_index: data.current.air_quality?.["us-epa-index"],
              gb_defra_index: data.current.air_quality?.["gb-defra-index"],
            },
          },
          forecast: {
            forecastday: [
              {
                astro: {
                  sunrise: "6:00 AM", // Replace with actual data if available
                  sunset: "8:00 PM", // Replace with actual data if available
                },
              },
            ],
          },
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error al obtener el clima:",
            error.response?.data || error.message
          );
        } else {
          console.error("Error al obtener el clima:", error);
        }
        throw new Error("Error al obtener el clima");
      }
    },
    getForecast: async (_: unknown, { city }: WeatherArgs) => {
      console.log(`Fetching forecast for city: ${city}`);
      return weatherMock.forecast;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };
