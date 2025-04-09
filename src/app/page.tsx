"use client";
import { useSearchParams } from "next/navigation";
import WeatherCard from "../app/components/WeatherCard";
import ForecastList from "../app/components/ForecastList";
import Container from "../app/components/Container";

export default function Home() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "Madrid";

  return (
    <Container>
      <div className="flex-1 lg:basis-1/3">
        <WeatherCard city={city} />
      </div>
      <div className="flex-2 lg:basis-2/3">
        <ForecastList city={city} />
      </div>
    </Container>
  );
}
