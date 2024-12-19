import Link from "next/link";
import ChartContainer from "@/components/ChartContainer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gantt and Timeline Charts</h1>
      <div className="mb-4 space-x-4">
        <Button asChild>
          <Link href="/projects/new">Create New Project</Link>
        </Button>
        <Button asChild>
          <Link href="/tasks/new">Create New Task</Link>
        </Button>
      </div>
      <ChartContainer />
    </main>
  );
}
