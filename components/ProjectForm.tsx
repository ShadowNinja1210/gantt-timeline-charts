'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

interface ProjectFormProps {
  project?: {
    _id: string
    name: string
    startDate: string
    endDate: string
  }
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [name, setName] = useState(project?.name || '')
  const [startDate, setStartDate] = useState(project?.startDate?.split('T')[0] || '')
  const [endDate, setEndDate] = useState(project?.endDate?.split('T')[0] || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const projectData = { name, startDate, endDate }
    const url = project ? `/api/projects/${project._id}` : '/api/projects'
    const method = project ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{project ? 'Edit Project' : 'Create New Project'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
        </CardContent>
        <CardFooter>
          <Button type="submit">{project ? 'Update Project' : 'Create Project'}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

