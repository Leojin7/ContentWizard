import React from 'react';
import { Project, Task, User, TaskPriority, ProjectStatus } from '../../types';
import TaskAnalyticsChart from '../dashboard/TaskAnalyticsChart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '../ui/Card';


const COLORS_PROJECT = ['#3B82F6', '#FBBF24', '#14B8A6']; // In Progress, ToDo, Done
const COLORS_PRIORITY = ['#F43F5E', '#FBBF24', '#6F767E']; // High, Medium, Low

const ProjectStatusPieChart = ({ projects }: { projects: Project[] }) => {
    const data = [
        { name: ProjectStatus.InProgress, value: projects.filter(p => p.status === ProjectStatus.InProgress).length },
        { name: ProjectStatus.ToDo, value: projects.filter(p => p.status === ProjectStatus.ToDo).length },
        { name: ProjectStatus.Done, value: projects.filter(p => p.status === ProjectStatus.Done).length },
    ].filter(d => d.value > 0);

    return (
        <Card>
            <h3 className="text-lg font-bold text-dark-text mb-4">Project Status</h3>
            <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS_PROJECT[index % COLORS_PROJECT.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

const TaskPriorityChart = ({ tasks }: { tasks: Task[] }) => {
     const data = [
        { name: TaskPriority.High, value: tasks.filter(t => t.priority === TaskPriority.High).length },
        { name: TaskPriority.Medium, value: tasks.filter(t => t.priority === TaskPriority.Medium).length },
        { name: TaskPriority.Low, value: tasks.filter(t => t.priority === TaskPriority.Low).length },
    ].filter(d => d.value > 0);

    return (
        <Card>
            <h3 className="text-lg font-bold text-dark-text mb-4">Tasks by Priority</h3>
            <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" paddingAngle={5}>
                             {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS_PRIORITY[index % COLORS_PRIORITY.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

const TeamWorkloadChart = ({ tasks, users }: { tasks: Task[], users: User[] }) => {
    const data = users.map(user => ({
        name: user.name.split(' ')[0],
        tasks: tasks.filter(task => task.assignees.some(a => a.id === user.id)).length
    })).filter(d => d.tasks > 0);

    return (
        <Card>
            <h3 className="text-lg font-bold text-dark-text mb-4">Team Workload</h3>
            <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} />
                        <Tooltip cursor={{fill: 'rgba(239, 239, 239, 0.5)'}} />
                        <Bar dataKey="tasks" fill="#343839" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}

interface AnalyticsPageProps {
    projects: Project[];
    tasks: Task[];
    users: User[];
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ projects, tasks, users }) => {
  return (
    <div className="p-6">
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-dark-text">Analytics Overview</h1>
            <p className="text-gray-text mt-1">Metrics and insights into your team's projects and performance.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaskAnalyticsChart title="Weekly Task Performance"/>
            <ProjectStatusPieChart projects={projects} />
            <TeamWorkloadChart tasks={tasks} users={users} />
            <TaskPriorityChart tasks={tasks} />
        </div>
    </div>
  );
};

export default AnalyticsPage;
