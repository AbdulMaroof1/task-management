import * as taskService from "@/lib/services/task.service";
import { handle, HttpError, json, readJson, validate } from "@/lib/utils/http";
import { createTaskSchema, taskIdSchema, updateTaskSchema } from "@/lib/validations/task.schema";

type Context = { params: Promise<{ id: string }> };

export function getTasks() {
  return handle(async () => {
    const tasks = await taskService.findAll();
    return json(tasks);
  });
}

export function createTask(request: Request) {
  return handle(async () => {
    const data = validate(createTaskSchema, await readJson(request));
    const task = await taskService.create(data);
    return json(task, 201);
  });
}

export function updateTask(request: Request, { params }: Context) {
  return handle(async () => {
    const id = validate(taskIdSchema, (await params).id);
    const data = validate(updateTaskSchema, await readJson(request));

    const task = await taskService.update(id, data);
    if (!task) throw new HttpError(404, "Task not found");

    return json(task);
  });
}

export function deleteTask(_request: Request, { params }: Context) {
  return handle(async () => {
    const id = validate(taskIdSchema, (await params).id);

    const deleted = await taskService.remove(id);
    if (!deleted) throw new HttpError(404, "Task not found");

    return json({ message: "Task deleted" });
  });
}
