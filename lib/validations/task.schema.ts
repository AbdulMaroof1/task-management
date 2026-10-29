import { z } from "zod";

const title = z
  .string({ error: "Title is required" })
  .trim()
  .min(1, "Title is required")
  .max(255, "Title must be at most 255 characters");

const description = z.string({ error: "Description must be a string" }).trim();

const completed = z.boolean({ error: "Completed must be a boolean" });

export const taskIdSchema = z.coerce
  .number({ error: "Invalid id" })
  .int("Invalid id")
  .positive("Invalid id");

export const createTaskSchema = z.object({
  title,
  description: description.default(""),
});

export const updateTaskSchema = z
  .object({
    title: title.optional(),
    description: description.optional(),
    completed: completed.optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    error: "Provide title, description or completed to update",
  });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
