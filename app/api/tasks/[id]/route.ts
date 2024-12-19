import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const task = await Task.findById(params.id);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(task);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await dbConnect();
  const task = await Task.findByIdAndUpdate(params.id, body, { new: true });
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(task);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const task = await Task.findByIdAndDelete(params.id);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Task deleted successfully" });
}
