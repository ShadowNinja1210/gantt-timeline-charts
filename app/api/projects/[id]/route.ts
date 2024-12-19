import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const project = await Project.findById(params.id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await dbConnect();
  const project = await Project.findByIdAndUpdate(params.id, body, { new: true });
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const project = await Project.findByIdAndDelete(params.id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Project deleted successfully" });
}
