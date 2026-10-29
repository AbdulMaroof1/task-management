import type { Task } from "@/lib/models/task.model";

export const taskFilters = ["all", "active", "completed"] as const;

export type TaskFilterValue = (typeof taskFilters)[number];

export function filterTasks(tasks: Task[], filter: TaskFilterValue) {
  if (filter === "active") return tasks.filter((t) => !t.completed);
  if (filter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
}

type Props = {
  value: TaskFilterValue;
  onChange: (value: TaskFilterValue) => void;
};

export default function TaskFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-1 rounded-lg bg-slate-200 p-1">
      {taskFilters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={`rounded-md px-3 py-1 text-sm capitalize transition ${
            value === filter ? "bg-white font-medium shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
