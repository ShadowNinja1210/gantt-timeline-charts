'use client'

import { useState, useEffect } from 'react';
import GanttChart from './GanttChart';
import TimelineChart from './TimelineChart';
import { Button } from '@/components/ui/button';

export default function ChartContainer() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeChart, setActiveChart] = useState('gantt');

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  return (
    <div>
      <div className="mb-4">
        <Button
          onClick={() => setActiveChart('gantt')}
          variant={activeChart === 'gantt' ? 'default' : 'outline'}
          className="mr-2"
        >
          Gantt Chart
        </Button>
        <Button
          onClick={() => setActiveChart('timeline')}
          variant={activeChart === 'timeline' ? 'default' : 'outline'}
        >
          Timeline Chart
        </Button>
      </div>
      {activeChart === 'gantt' ? (
        <GanttChart tasks={tasks} />
      ) : (
        <TimelineChart projects={projects} tasks={tasks} />
      )}
    </div>
  );
}

