import React from 'react';
import { Project } from '../../types';
import Card from '../ui/Card';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <Card padding="p-4">
            <h4 className="font-bold text-sm text-dark-text mb-1">{project.name}</h4>
            <p className="text-xs text-gray-text mb-4 leading-relaxed">{project.description.substring(0, 100)}{project.description.length > 100 && '...'}</p>
            <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                    {project.members.map(member => (
                        <img key={member.id} src={member.avatar} alt={member.name} title={member.name} className="w-8 h-8 rounded-full border-2 border-white"/>
                    ))}
                </div>
                {/* Could add a progress bar or task count here in the future */}
            </div>
        </Card>
    );
};

export default ProjectCard;
