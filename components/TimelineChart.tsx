"use client";

import Timeline from "react-calendar-timeline";
// import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

interface Project {
  _id: string;
  name: string;
}

interface Task {
  _id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
}

export default function TimelineChart({ projects, tasks }: { projects: Project[]; tasks: Task[] }) {
  const groups = projects.map((project) => ({
    id: project._id,
    title: project.name,
  }));

  const items = tasks.map((task) => ({
    id: task._id,
    group: task.projectId,
    title: task.name,
    start_time: moment(task.startDate),
    end_time: moment(task.endDate),
  }));

  return (
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-12, "hour")}
      defaultTimeEnd={moment().add(12, "hour")}
    />
  );
}
