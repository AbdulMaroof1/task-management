import type { Task } from "@/lib/models/task.model";
import type { CreateTaskInput, UpdateTaskInput } from "@/lib/validations/task.schema";
import { api } from "./client";

export const tasksApi = {
  getAll: () => api.get<Task[]>("/tasks").then((res) => res.data),

  create: (data: CreateTaskInput) => api.post<Task>("/tasks", data).then((res) => res.data),

  update: (id: number, data: UpdateTaskInput) =>
    api.patch<Task>(`/tasks/${id}`, data).then((res) => res.data),

  remove: (id: number) => api.delete(`/tasks/${id}`).then(() => id),
};
