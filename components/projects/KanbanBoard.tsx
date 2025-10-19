import React from 'react';
import { Project, User, ProjectStatus } from '../../types';
import ProjectCard from './ProjectCard';

interface KanbanBoardProps {
    projects: Project[];
    users: User[];
}

const KanbanColumn = ({ title, projects }: { title: string, projects: Project[] }) => (
    <div className="bg-light rounded-xl flex-1">
        <h3 className="text-md font-bold text-dark-text p-4 border-b border-light-3">{title} ({projects.length})</h3>
        <div className="p-4 space-y-4">
            {projects.length > 0 ? (
                projects.map(project => <ProjectCard key={project.id} project={project} />)
            ) : (
                <div className="text-center py-10 text-gray-text text-sm">No projects in this stage.</div>
            )}
        </div>
    </div>
);

const KanbanBoard: React.FC<KanbanBoardProps> = ({ projects }) => {
    const todoProjects = projects.filter(p => p.status === ProjectStatus.ToDo);
    const inProgressProjects = projects.filter(p => p.status === ProjectStatus.InProgress);
    const doneProjects = projects.filter(p => p.status === ProjectStatus.Done);

    return (
        <div className="flex space-x-6">
            <KanbanColumn title="To Do" projects={todoProjects} />
            <KanbanColumn title="In Progress" projects={inProgressProjects} />
            <KanbanColumn title="Done" projects={doneProjects} />
        </div>
    );
};

export default KanbanBoard;
