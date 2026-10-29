import type { Weather } from "@/lib/models/weather.model";
import { api } from "./client";

export const weatherApi = {
  getByCity: (city: string) =>
    api.get<Weather>("/weather", { params: { city } }).then((res) => res.data),
};
