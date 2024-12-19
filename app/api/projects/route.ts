import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
  await dbConnect();
  const projects = await Project.find({});
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  await dbConnect();
  const project = new Project(body);
  await project.save();
  return NextResponse.json(project);
}
