import TaskForm from "@/components/TaskForm";

export default function NewTask() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Task</h1>
      <TaskForm />
    </div>
  );
}
