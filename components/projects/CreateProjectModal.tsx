import React, { useState } from 'react';
import { XIcon, PlusIcon } from '../icons/Icons';
import { Project } from '../../types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Omit<Project, 'id' | 'status' | 'members'>, generateTasks: boolean) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onCreateProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [generateTasks, setGenerateTasks] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
        setError('Project name is required.');
        return;
    }
    setError('');
    onCreateProject({ name, description }, generateTasks);
    setName('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-light-3">
        <div className="flex justify-between items-center p-4 border-b border-light-3">
          <h2 className="text-xl font-bold">Create New Project</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-light-2">
            <XIcon className="w-5 h-5 text-gray-text" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="projectName" className="block text-sm font-semibold text-dark-text mb-2">Project Name</label>
                    <input
                        id="projectName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border-light-3 bg-light rounded-lg shadow-sm focus:ring-dark-text focus:border-dark-text text-sm p-3 font-semibold"
                        placeholder="e.g., Q4 Marketing Campaign"
                    />
                     {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                <div>
                    <label htmlFor="projectDescription" className="block text-sm font-semibold text-dark-text mb-2">Description (Optional)</label>
                    <textarea
                        id="projectDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Briefly describe the project's goals."
                        className="w-full border-light-3 bg-light rounded-lg shadow-sm focus:ring-dark-text focus:border-dark-text text-sm p-3 font-semibold"
                        rows={4}
                    />
                </div>
                <div className="flex items-center space-x-3 bg-light p-3 rounded-lg">
                    <input 
                        type="checkbox" 
                        id="generateTasks" 
                        checked={generateTasks} 
                        onChange={(e) => setGenerateTasks(e.target.checked)}
                        className="h-4 w-4 rounded text-purple-dark focus:ring-purple-dark/50 border-gray-300"
                    />
                    <label htmlFor="generateTasks" className="text-sm font-semibold text-dark-text">
                       🤖 Use AI to suggest initial tasks for this project
                    </label>
                </div>
            </div>

            <div className="flex justify-end items-center p-4 border-t border-light-3 space-x-3 bg-light/50 rounded-b-2xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-bold text-dark-text bg-white border border-light-3 rounded-lg hover:bg-light-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-bold text-white bg-dark rounded-lg hover:bg-opacity-80 flex items-center"
                >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create Project
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
