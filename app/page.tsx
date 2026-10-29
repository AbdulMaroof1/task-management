import TaskManager from "@/components/TaskManager";
import WeatherWidget from "@/components/WeatherWidget";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Task Manager</h1>
        <p className="mt-1 text-slate-500">Keep track of what needs to get done.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <TaskManager />
        <aside>
          <WeatherWidget />
        </aside>
      </div>
    </main>
  );
}
