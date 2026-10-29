import type { Weather } from "@/lib/models/weather.model";
import { HttpError } from "@/lib/utils/http";

const GEOCODING_API_URL =
  process.env.GEOCODING_API_URL ?? "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API_URL = process.env.WEATHER_API_URL ?? "https://api.open-meteo.com/v1/forecast";

const weatherCodes: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail",
};

async function fetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new HttpError(502, "Weather provider is unavailable");
  return res.json();
}

export async function getByCity(city: string): Promise<Weather> {
  const geo = await fetchJson(`${GEOCODING_API_URL}?name=${encodeURIComponent(city)}&count=1`);
  const place = geo.results?.[0];
  if (!place) throw new HttpError(404, "City not found");

  const { current_weather } = await fetchJson(
    `${WEATHER_API_URL}?latitude=${place.latitude}&longitude=${place.longitude}&current_weather=true`,
    { next: { revalidate: 600 } }
  );

  return {
    city: place.name,
    country: place.country,
    temperature: current_weather.temperature,
    windspeed: current_weather.windspeed,
    description: weatherCodes[current_weather.weathercode] ?? "Unknown",
  };
}
