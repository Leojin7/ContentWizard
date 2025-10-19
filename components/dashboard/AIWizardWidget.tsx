import React, { useState } from 'react';
import Card from '../ui/Card';
import { MoreHorizontalIcon, SparklesIcon } from '../icons/Icons';
import ContentWizardModal from '../ai/ContentWizardModal';
import { Task } from '../../types';

interface AIWizardWidgetProps {
    onAddTask: (task: Omit<Task, 'id'>) => void;
}

const AIWizardWidget: React.FC<AIWizardWidgetProps> = ({ onAddTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
        <Card>
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-bold text-dark-text">AI Content Wizard</h3>
                    <p className="text-sm text-gray-text">Generate content for your next big idea.</p>
                </div>
                <button className="text-gray-text hover:text-dark-text">
                    <MoreHorizontalIcon className="w-5 h-5"/>
                </button>
            </div>
            
            <div className="flex items-center justify-center my-6">
                <div className="w-24 h-24 bg-light rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-12 h-12 text-dark-text" />
                </div>
            </div>

            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-dark text-white font-bold py-3.5 rounded-lg hover:bg-opacity-80 transition-colors flex items-center justify-center space-x-2"
            >
                <span>Launch Wizard</span>
            </button>
        </Card>
        <ContentWizardModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onAddTask={onAddTask}
        />
        </>
    );
};

export default AIWizardWidget;
