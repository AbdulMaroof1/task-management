import { useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api/client";
import { tasksApi } from "@/lib/api/tasks.api";
import type { Task } from "@/lib/models/task.model";
import type { CreateTaskInput, UpdateTaskInput } from "@/lib/validations/task.schema";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    tasksApi
      .getAll()
      .then(setTasks)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  async function run<T>(request: () => Promise<T>) {
    setError("");
    try {
      return await request();
    } catch (err) {
      setError(getErrorMessage(err));
      return null;
    }
  }

  async function addTask(data: CreateTaskInput) {
    const task = await run(() => tasksApi.create(data));
    if (task) setTasks((prev) => [task, ...prev]);
    return Boolean(task);
  }

  async function updateTask(id: number, data: UpdateTaskInput) {
    const task = await run(() => tasksApi.update(id, data));
    if (task) setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
    return Boolean(task);
  }

  async function deleteTask(id: number) {
    const deletedId = await run(() => tasksApi.remove(id));
    if (deletedId) setTasks((prev) => prev.filter((t) => t.id !== deletedId));
  }

  return { tasks, loading, error, addTask, updateTask, deleteTask };
}
