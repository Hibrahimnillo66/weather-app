import { useState } from "react";
import { WeatherData } from "../types/weather";
import { fetchWeather } from "../utils/weatherApi";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getWeather = async (city: string) => {
    setError(null);
    setLoading(true);
    try {
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);
    } catch (err: any) {
      setError(err.message || "Error al obtener el clima");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return { weather, error, loading, getWeather };
}