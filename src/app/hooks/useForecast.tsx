import { useState, useCallback } from "react";
import { ForecastData } from "../types/weather";
import { fetchForecast } from "../utils/weatherApi";

export default function useForecast() {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getForecast = useCallback(async (city: string) => {
    setError(null);
    setLoading(true);
    try {
      const forecastData = await fetchForecast(city);
      setForecast(forecastData);
    } catch (err: any) {
      setError(err.message || "Error al obtener el pronóstico");
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { forecast, error, loading, getForecast };
}