'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskFormProps {
  task?: {
    _id: string
    name: string
    startDate: string
    endDate: string
    progress: number
    projectId: string
  }
}

export default function TaskForm({ task }: TaskFormProps) {
  const router = useRouter()
  const [name, setName] = useState(task?.name || '')
  const [startDate, setStartDate] = useState(task?.startDate?.split('T')[0] || '')
  const [endDate, setEndDate] = useState(task?.endDate?.split('T')[0] || '')
  const [progress, setProgress] = useState(task?.progress?.toString() || '0')
  const [projectId, setProjectId] = useState(task?.projectId || '')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data)
    }
    fetchProjects()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const taskData = { name, startDate, endDate, progress: parseInt(progress), projectId }
    const url = task ? `/api/tasks/${task._id}` : '/api/tasks'
    const method = task ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{task ? 'Edit Task' : 'Create New Task'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Task Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectId">Project</Label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project._id} value={project._id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{task ? 'Update Task' : 'Create Task'}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

