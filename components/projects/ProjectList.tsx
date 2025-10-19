import React from 'react';
import { Project, User, ProjectStatus } from '../../types';
import Card from '../ui/Card';

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
    const statusStyles: { [key in ProjectStatus]: string } = {
        [ProjectStatus.ToDo]: 'bg-gray-200 text-gray-800',
        [ProjectStatus.InProgress]: 'bg-blue-light text-blue-dark',
        [ProjectStatus.Done]: 'bg-green-light text-green-dark',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
};

const ProjectList: React.FC<{ projects: Project[], users: User[] }> = ({ projects }) => {
    return (
        <Card padding="p-0">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-light-3">
                        <tr>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-text uppercase">Project Name</th>
                            <th className="py-3 px-3 text-xs font-semibold text-gray-text uppercase hidden md:table-cell">Status</th>
                            <th className="py-3 px-3 text-xs font-semibold text-gray-text uppercase hidden lg:table-cell">Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                             <tr key={project.id} className="border-b border-light-3 last:border-b-0">
                                <td className="py-4 px-6">
                                    <p className="font-semibold text-dark-text text-sm">{project.name}</p>
                                    <p className="text-xs text-gray-text truncate max-w-md">{project.description}</p>
                                </td>
                                <td className="py-4 px-3 hidden md:table-cell">
                                    <StatusBadge status={project.status} />
                                </td>
                                <td className="py-4 px-3 hidden lg:table-cell">
                                    <div className="flex -space-x-2">
                                        {project.members.map(member => (
                                            <img key={member.id} src={member.avatar} alt={member.name} title={member.name} className="w-8 h-8 rounded-full border-2 border-white"/>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default ProjectList;
