import { createTask, getTasks } from "@/lib/controllers/task.controller";

export const dynamic = "force-dynamic";

export const GET = getTasks;
export const POST = createTask;
