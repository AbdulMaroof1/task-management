import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api/client";
import { weatherApi } from "@/lib/api/weather.api";
import type { Weather } from "@/lib/models/weather.model";

export function useWeather(initialCity: string) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = useCallback(async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    try {
      setWeather(await weatherApi.getByCity(city));
    } catch (err) {
      setWeather(null);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    search(initialCity);
  }, [initialCity, search]);

  return { weather, loading, error, search };
}
