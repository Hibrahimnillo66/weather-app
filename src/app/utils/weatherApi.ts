import { WeatherData, ForecastData } from "../types/weather"; // Import the unified interfaces

// Fetch current weather data
export async function fetchWeather(city: string): Promise<WeatherData> {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query { 
        getWeather(city: "${city}") {
          location { 
            name 
            country 
            localtime 
            lat 
            lon 
          }
          current { 
            temp_c 
            condition { 
              text 
              icon 
            } 
            humidity 
            wind_kph 
            vis_km 
            uv 
            last_updated 
          }
        }
      }`,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.getWeather as WeatherData; // Ensure the returned data matches the WeatherData interface
}

// Fetch forecast data
export async function fetchForecast(city: string): Promise<ForecastData> {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query { 
        getForecast(city: "${city}") {
          forecastday { 
            date 
            astro { 
              sunrise 
              sunset 
              moonrise 
              moonset 
              moon_phase 
              moon_illumination 
            } 
            mintemp 
            maxtemp 
            avgtemp 
            totalsnow 
            sunhour 
            uv_index 
            hourly { 
              time 
              temperature 
              wind_speed 
              weather_descriptions 
              weather_icons
              precip
              humidity
              visibility
              pressure
              cloudcover
              feelslike
              uv_index
            } 
          } 
        }
      }`,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.getForecast as ForecastData; // Ensure the returned data matches the ForecastData interface
}
