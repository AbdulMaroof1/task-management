"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import type { CreateTaskInput } from "@/lib/validations/task.schema";

const emptyTask: CreateTaskInput = { title: "", description: "" };

type Props = {
  initialValues?: CreateTaskInput;
  submitLabel: string;
  onSubmit: (data: CreateTaskInput) => Promise<boolean>;
  onCancel?: () => void;
};

export default function TaskForm({
  initialValues = emptyTask,
  submitLabel,
  onSubmit,
  onCancel,
}: Props) {
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.title.trim()) return;

    setSaving(true);
    const ok = await onSubmit(values);
    setSaving(false);

    if (ok) setValues(initialValues);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        placeholder="What needs to be done?"
        maxLength={255}
      />
      <Textarea
        value={values.description}
        onChange={(e) => setValues({ ...values, description: e.target.value })}
        placeholder="Description (optional)"
      />
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={saving || !values.title.trim()}
          className={onCancel ? "" : "w-full sm:w-auto"}
        >
          {saving ? "Saving..." : submitLabel}
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
