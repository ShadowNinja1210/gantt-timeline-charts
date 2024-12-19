import ProjectForm from "@/components/ProjectForm";
import { notFound } from "next/navigation";

async function getProject(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, { cache: "no-store" });
  if (!res.ok) return undefined;
  return res.json();
}

export default async function EditProject({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
