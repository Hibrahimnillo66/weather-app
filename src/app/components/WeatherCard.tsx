"use client";
import { useState, useEffect } from "react";
import { WeatherData } from "../types/weather";
import { useWeather } from "../hooks/useWeather";
import { FiDroplet, FiWind, FiEye, FiSun, FiClock } from "react-icons/fi";
import { WiSunrise, WiSunset } from "react-icons/wi";

interface WeatherCardProps {
  city?: string;
  initialData?: WeatherData;
}

export default function WeatherCard({ city, initialData }: WeatherCardProps) {
  const [displayData, setDisplayData] = useState<WeatherData | undefined>(
    initialData
  );
  const [localTime, setLocalTime] = useState("");
  const [isDayTime, setIsDayTime] = useState(true);

  const { weather, error, loading, getWeather } = useWeather();

  useEffect(() => {
    if (city) {
      getWeather(city);
    }
  }, [city]);

  useEffect(() => {
    if (weather) {
      setDisplayData(weather);
    } else if (initialData) {
      setDisplayData(initialData);
    }
  }, [weather, initialData]);

  useEffect(() => {
    if (displayData?.location?.localtime) {
      const time = new Date(displayData.location.localtime);
      setLocalTime(
        time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setIsDayTime(time.getHours() > 6 && time.getHours() < 18);
    }
  }, [displayData]);

  if (loading)
    return (
      <div className="max-w-md mx-auto mt-8 p-6 text-center rounded-xl bg-blue-50 animate-pulse">
        <p>Cargando datos del clima...</p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-md mx-auto mt-8 p-6 text-center rounded-xl bg-red-50 text-red-600">
        Error: {error}
      </div>
    );

  if (!displayData)
    return (
      <div className="max-w-md mx-auto mt-8 p-6 text-center rounded-xl bg-gray-100">
        Ingresa una ciudad para ver el clima
      </div>
    );

  return (
    <div
      className={`flex flex-col justify-between h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isDayTime
          ? "bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800"
          : "bg-gradient-to-br from-blue-200 to-gray-300 text-gray-900"
      }`}
    >
      {/* Header */}
      <div
        className={`p-6 text-center ${
          isDayTime ? "bg-blue-200 text-gray-800" : "bg-blue-300 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold">
          {displayData.location.name}, {displayData.location.country}
        </h2>
        <p className="text-sm opacity-90">
          {new Date(displayData.location.localtime).toLocaleDateString(
            "es-ES",
            {
              weekday: "long",
              day: "numeric",
              month: "long",
            }
          )}
        </p>
        <p className="text-sm opacity-90 mt-1 flex items-center justify-center gap-1">
          <FiClock size={14} /> {localTime}
        </p>
      </div>

      {/* Current Weather */}
      <div className="p-6 text-center flex-1 flex items-center justify-center">
        <div className="flex justify-center items-center gap-4">
          <img
            src={displayData.current.condition.icon}
            alt={displayData.current.condition.text}
            className="w-20 h-20"
          />
          <div>
            <p className="text-5xl font-bold">{displayData.current.temp_c}°C</p>
            <p className="text-lg capitalize">
              {displayData.current.condition.text}
            </p>
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 p-6 bg-white bg-opacity-20 backdrop-blur-sm text-gray-800">
        <WeatherDetail
          icon={<FiDroplet className="text-blue-400" size={20} />}
          label="Humedad"
          value={`${displayData.current.humidity}%`}
        />
        <WeatherDetail
          icon={<FiWind className="text-blue-400" size={20} />}
          label="Viento"
          value={`${displayData.current.wind_kph} km/h`}
        />
        <WeatherDetail
          icon={<FiEye className="text-blue-400" size={20} />}
          label="Visibilidad"
          value={`${displayData.current.vis_km} km`}
        />
        <WeatherDetail
          icon={<FiSun className="text-blue-400" size={20} />}
          label="Índice UV"
          value={displayData.current.uv.toString()}
        />
      </div>

      {/* Sunrise/Sunset */}
      {displayData.forecast?.forecastday?.[0]?.astro && (
        <div className="flex justify-around p-4 bg-blue-100 bg-opacity-50 text-sm text-gray-800">
          <WeatherDetail
            icon={<WiSunrise size={24} className="text-amber-500" />}
            label="Amanecer"
            value={displayData.forecast.forecastday[0].astro.sunrise}
          />
          <WeatherDetail
            icon={<WiSunset size={24} className="text-purple-500" />}
            label="Atardecer"
            value={displayData.forecast.forecastday[0].astro.sunset}
          />
        </div>
      )}
    </div>
  );
}

// Helper component for weather details
function WeatherDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <p className="text-sm opacity-80">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
