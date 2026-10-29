import type { Task } from "@/lib/models/task.model";
import type { UpdateTaskInput } from "@/lib/validations/task.schema";
import TaskItem from "./TaskItem";

type Props = {
  tasks: Task[];
  loading: boolean;
  onUpdate: (id: number, data: UpdateTaskInput) => Promise<boolean>;
  onDelete: (id: number) => void;
};

export default function TaskList({ tasks, loading, onUpdate, onDelete }: Props) {
  if (loading) {
    return <p className="py-10 text-center text-slate-400">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-400">
        No tasks here yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
