import React, { useState } from 'react';
import Card from '../ui/Card';
import { Project, User } from '../../types';
import KanbanBoard from '../projects/KanbanBoard';
import ProjectList from '../projects/ProjectList';
import CreateProjectModal from '../projects/CreateProjectModal';
import { PlusIcon } from '../icons/Icons';

interface ProjectsPageProps {
    projects: Project[];
    users: User[];
    view: 'kanban' | 'list';
    setView: (view: 'kanban' | 'list') => void;
    onCreateProject: (project: Omit<Project, 'id' | 'status' | 'members'>, generateTasks: boolean) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, users, view, setView, onCreateProject }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProjectCreated = (project: Omit<Project, 'id' | 'status' | 'members'>, generateTasks: boolean) => {
        onCreateProject(project, generateTasks);
        setIsModalOpen(false);
    };

    return (
    <>
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-dark-text">Projects</h1>
                    <p className="text-gray-text mt-1">View, create, and manage all your team's projects.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-light p-1 rounded-lg">
                        <button 
                            onClick={() => setView('kanban')}
                            className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${view === 'kanban' ? 'bg-white shadow-sm' : 'text-gray-text'}`}
                        >
                            Kanban Board
                        </button>
                        <button 
                            onClick={() => setView('list')}
                            className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${view === 'list' ? 'bg-white shadow-sm' : 'text-gray-text'}`}
                        >
                            List View
                        </button>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-2 bg-dark text-white font-bold py-2.5 px-4 rounded-lg hover:bg-opacity-80"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Create Project</span>
                    </button>
                </div>
            </div>
            
            <div>
                {view === 'kanban' ? (
                    <KanbanBoard projects={projects} users={users} />
                ) : (
                    <ProjectList projects={projects} users={users} />
                )}
            </div>
        </div>
        <CreateProjectModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onCreateProject={handleProjectCreated}
        />
    </>
  );
};

export default ProjectsPage;