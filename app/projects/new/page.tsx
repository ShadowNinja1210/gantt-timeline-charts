import ProjectForm from "@/components/ProjectForm";

export default function NewProject() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Project</h1>
      <ProjectForm />
    </div>
  );
}
