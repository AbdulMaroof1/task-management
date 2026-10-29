import { z } from "zod";

export const citySchema = z.string({ error: "City is required" }).trim().min(1, "City is required");
