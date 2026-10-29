"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { Task } from "@/lib/models/task.model";
import type { CreateTaskInput, UpdateTaskInput } from "@/lib/validations/task.schema";
import TaskForm from "./TaskForm";

type Props = {
  task: Task;
  onUpdate: (id: number, data: UpdateTaskInput) => Promise<boolean>;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);

  async function handleSave(data: CreateTaskInput) {
    const ok = await onUpdate(task.id, data);
    if (ok) setEditing(false);
    return ok;
  }

  return (
    <li>
      <Card>
        {editing ? (
          <TaskForm
            initialValues={{ title: task.title, description: task.description }}
            submitLabel="Save"
            onSubmit={handleSave}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <div className="flex items-start gap-3">
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
              <Button variant="link" size="sm" onClick={() => setEditing(true)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </Card>
    </li>
  );
}
