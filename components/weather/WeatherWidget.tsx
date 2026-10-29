"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { useWeather } from "@/hooks/useWeather";

const DEFAULT_CITY = "London";

export default function WeatherWidget() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const { weather, loading, error, search } = useWeather(DEFAULT_CITY);

  return (
    <Card>
      <h2 className="font-semibold text-slate-900">Weather</h2>
      <p className="text-xs text-slate-400">Powered by Open-Meteo</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(city);
        }}
        className="mt-4 flex gap-2"
      >
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="min-w-0 flex-1 text-sm"
        />
        <Button type="submit" variant="dark">
          Go
        </Button>
      </form>

      <div className="mt-4">
        {loading && <p className="text-sm text-slate-400">Loading...</p>}
        {!loading && error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && weather && (
          <div>
            <p className="text-sm text-slate-500">
              {weather.city}, {weather.country}
            </p>
            <p className="text-4xl font-bold text-slate-900">{Math.round(weather.temperature)}°C</p>
            <p className="text-sm text-slate-600">{weather.description}</p>
            <p className="mt-1 text-xs text-slate-400">Wind: {weather.windspeed} km/h</p>
          </div>
        )}
      </div>
    </Card>
  );
}
