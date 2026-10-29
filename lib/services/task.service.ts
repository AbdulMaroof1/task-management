import { sql } from "@/lib/db";
import type { CreateTaskInput, UpdateTaskInput } from "@/lib/validations/task.schema";
import type { Task } from "@/lib/models/task.model";

export async function findAll() {
  return (await sql`SELECT * FROM tasks ORDER BY created_at DESC`) as Task[];
}

export async function create(data: CreateTaskInput) {
  const rows = await sql`
    INSERT INTO tasks (title, description)
    VALUES (${data.title}, ${data.description})
    RETURNING *
  `;
  return rows[0] as Task;
}

export async function update(id: number, data: UpdateTaskInput) {
  const rows = await sql`
    UPDATE tasks SET
      title = COALESCE(${data.title ?? null}, title),
      description = COALESCE(${data.description ?? null}, description),
      completed = COALESCE(${data.completed ?? null}, completed),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Task | undefined;
}

export async function remove(id: number) {
  const rows = await sql`DELETE FROM tasks WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
