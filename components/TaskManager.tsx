"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/lib/models/task.model";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

type Filter = "all" | "active" | "completed";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setTasks)
      .catch(() => setError("Could not load tasks."))
      .finally(() => setLoading(false));
  }, []);

  async function request(url: string, method: string, body?: object) {
    setError("");
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return null;
    }
    return data;
  }

  async function addTask(title: string, description: string) {
    const task = await request("/api/tasks", "POST", { title, description });
    if (task) setTasks((prev) => [task, ...prev]);
    return Boolean(task);
  }

  async function editTask(id: number, changes: Partial<Task>) {
    const task = await request(`/api/tasks/${id}`, "PUT", changes);
    if (task) setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
    return Boolean(task);
  }

  async function removeTask(id: number) {
    const result = await request(`/api/tasks/${id}`, "DELETE");
    if (result) setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const visibleTasks = tasks.filter((t) =>
    filter === "all" ? true : filter === "completed" ? t.completed : !t.completed
  );
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <section className="space-y-6">
      <TaskForm onSubmit={addTask} />

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {completedCount} of {tasks.length} completed
        </p>
        <div className="flex gap-1 rounded-lg bg-slate-200 p-1">
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1 text-sm capitalize transition ${
                filter === f ? "bg-white font-medium shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="py-10 text-center text-slate-400">Loading tasks...</p>
      ) : visibleTasks.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-400">
          No tasks here yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {visibleTasks.map((task) => (
            <TaskItem key={task.id} task={task} onUpdate={editTask} onDelete={removeTask} />
          ))}
        </ul>
      )}
    </section>
  );
}
