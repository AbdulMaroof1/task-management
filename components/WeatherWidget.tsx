"use client";

import { useEffect, useState } from "react";
import type { Weather } from "@/lib/models/weather.model";

export default function WeatherWidget() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadWeather(name: string) {
    if (!name.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err instanceof Error && err.message ? err.message : "Could not load weather.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather("London");
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-900">Weather</h2>
      <p className="text-xs text-slate-400">Powered by Open-Meteo</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadWeather(city);
        }}
        className="mt-4 flex gap-2"
      >
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-indigo-500"
        />
        <button className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-900">
          Go
        </button>
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
    </div>
  );
}
