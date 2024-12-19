import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET() {
  await dbConnect();
  const tasks = await Task.find({}).populate("projectId");
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  await dbConnect();
  const task = new Task(body);
  await task.save();
  return NextResponse.json(task);
}
