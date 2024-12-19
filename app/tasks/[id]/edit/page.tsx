import TaskForm from "@/components/TaskForm";
import { notFound } from "next/navigation";

async function getTask(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, { cache: "no-store" });
  if (!res.ok) return undefined;
  return res.json();
}

export default async function EditTask({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);

  if (!task) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <TaskForm task={task} />
    </div>
  );
}
