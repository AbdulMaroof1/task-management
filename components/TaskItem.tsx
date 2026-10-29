"use client";

import { useState } from "react";
import type { Task } from "@/lib/models/task.model";

type Props = {
  task: Task;
  onUpdate: (id: number, changes: Partial<Task>) => Promise<boolean>;
  onDelete: (id: number) => Promise<void>;
};

export default function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  async function save() {
    if (!title.trim()) return;
    const ok = await onUpdate(task.id, { title, description });
    if (ok) setEditing(false);
  }

  function cancel() {
    setTitle(task.title);
    setDescription(task.description);
    setEditing(false);
  }

  if (editing) {
    return (
      <li className="space-y-3 rounded-xl border border-indigo-200 bg-white p-4 shadow-sm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={255}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <div className="flex gap-2">
          <button
            onClick={save}
            className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            onClick={cancel}
            className="rounded-lg border border-slate-300 px-4 py-1.5 text-sm hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task.id, { completed: !task.completed })}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-indigo-600"
        aria-label="Mark as completed"
      />
      <div className="min-w-0 flex-1">
        <p className={`break-words font-medium ${task.completed ? "text-slate-400 line-through" : ""}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="mt-1 break-words text-sm text-slate-500">{task.description}</p>
        )}
        <p className="mt-2 text-xs text-slate-400">
          {new Date(task.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
        <button
          onClick={() => setEditing(true)}
          className="rounded-md px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
