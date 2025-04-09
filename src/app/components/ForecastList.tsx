"use client";
import { useEffect } from "react";
import useForecast from "../hooks/useForecast"; // Use the custom hook
import { ForecastData } from "../types/weather"; // Import the ForecastData interface

interface ForecastListProps {
  city: string;
}

export default function ForecastList({ city }: ForecastListProps) {
  const { forecast, error, loading, getForecast } = useForecast();

  useEffect(() => {
    getForecast(city); // Fetch forecast data when the city changes
  }, [city, getForecast]);

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg shadow-md animate-pulse">
        <p>Cargando pronóstico...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg shadow-md text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!forecast) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-md flex-grow lg:basis-2/3">
      <h2 className="text-xl font-bold text-center text-gray-800">14-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        {forecast.forecastday.map((day, index) => (
          <ForecastDayCard key={index} day={day} />
        ))}
      </div>
    </div>
  );
}

interface ForecastDayCardProps {
  day: ForecastData["forecastday"][0];
}

function ForecastDayCard({ day }: ForecastDayCardProps) {
  // Safely access the first hourly entry
  const firstHourly = day.hourly && day.hourly.length > 0 ? day.hourly[0] : null;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
      <p className="font-medium text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</p>
      {firstHourly?.weather_icons?.[0] ? (
        <img
          src={firstHourly.weather_icons[0]}
          alt={firstHourly.weather_descriptions?.[0] || "Weather icon"}
          className="w-16 h-16"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-300 rounded-full" />
      )}
      <div className="text-center mt-2">
        <p className="text-sm font-semibold text-gray-800">{day.mintemp}°C / {day.maxtemp}°C</p>
        <p className="text-xs text-gray-500">{firstHourly?.weather_descriptions?.[0]}</p>
      </div>
    </div>
  );
}