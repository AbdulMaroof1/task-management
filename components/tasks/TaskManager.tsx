"use client";

import { useState } from "react";
import Alert from "@/components/ui/Alert";
import Card from "@/components/ui/Card";
import { useTasks } from "@/hooks/useTasks";
import TaskFilter, { filterTasks, type TaskFilterValue } from "./TaskFilter";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function TaskManager() {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilterValue>("all");

  const visibleTasks = filterTasks(tasks, filter);
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <section className="space-y-6">
      <Card>
        <TaskForm submitLabel="Add Task" onSubmit={addTask} />
      </Card>

      <Alert message={error} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {completedCount} of {tasks.length} completed
        </p>
        <TaskFilter value={filter} onChange={setFilter} />
      </div>

      <TaskList tasks={visibleTasks} loading={loading} onUpdate={updateTask} onDelete={deleteTask} />
    </section>
  );
}
