import * as weatherService from "@/lib/services/weather.service";
import { handle, json, validate } from "@/lib/utils/http";
import { citySchema } from "@/lib/validations/weather.schema";

export function getWeather(request: Request) {
  return handle(async () => {
    const city = validate(citySchema, new URL(request.url).searchParams.get("city"));
    const weather = await weatherService.getByCity(city);
    return json(weather);
  });
}
