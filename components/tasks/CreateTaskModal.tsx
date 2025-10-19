import React, { useState } from 'react';
import { XIcon, PlusIcon } from '../icons/Icons';
import { Task, TaskStatus, TaskPriority, User } from '../../types';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
  users: User[];
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onAddTask, users }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.ToDo);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Medium);
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
        setError('Task name is required.');
        return;
    }
    setError('');
    
    const selectedAssignees = users.filter(user => assigneeIds.includes(user.id));
    
    const newTask: Omit<Task, 'id'> = {
        name,
        status,
        priority,
        assignees: selectedAssignees,
        logo: 'https://em-content.zobj.net/source/apple/354/clipboard_1f4cb.png',
        handle: `#TASK-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        amount: 0,
    };

    onAddTask(newTask);
    // Reset form
    setName('');
    setStatus(TaskStatus.ToDo);
    setPriority(TaskPriority.Medium);
    setAssigneeIds([]);
  };
  
  const handleAssigneeChange = (userId: string) => {
    setAssigneeIds(prev => 
        prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-light-3">
        <div className="flex justify-between items-center p-4 border-b border-light-3">
          <h2 className="text-xl font-bold">Create New Task</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-light-2">
            <XIcon className="w-5 h-5 text-gray-text" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="taskName" className="block text-sm font-semibold text-dark-text mb-2">Task Name</label>
                    <input
                        id="taskName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border-light-3 bg-light rounded-lg shadow-sm focus:ring-dark-text focus:border-dark-text text-sm p-3 font-semibold"
                        placeholder="e.g., Design new landing page mockups"
                    />
                     {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="taskStatus" className="block text-sm font-semibold text-dark-text mb-2">Status</label>
                        <select id="taskStatus" value={status} onChange={e => setStatus(e.target.value as TaskStatus)} className="w-full border-light-3 bg-light rounded-lg shadow-sm focus:ring-dark-text focus:border-dark-text text-sm p-3 font-semibold">
                            {Object.values(TaskStatus).filter(s => ![TaskStatus.Received, TaskStatus.Sent, TaskStatus.Payment].includes(s)).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="taskPriority" className="block text-sm font-semibold text-dark-text mb-2">Priority</label>
                        <select id="taskPriority" value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="w-full border-light-3 bg-light rounded-lg shadow-sm focus:ring-dark-text focus:border-dark-text text-sm p-3 font-semibold">
                           {Object.values(TaskPriority).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-dark-text mb-2">Assignees</label>
                    <div className="max-h-32 overflow-y-auto bg-light rounded-lg p-2 space-y-2 border border-light-3">
                        {users.map(user => (
                            <div key={user.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-light-2">
                                <input type="checkbox" id={`user-${user.id}`} checked={assigneeIds.includes(user.id)} onChange={() => handleAssigneeChange(user.id)} className="h-4 w-4 rounded text-dark focus:ring-dark-3"/>
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full"/>
                                <label htmlFor={`user-${user.id}`} className="font-semibold text-sm">{user.name}</label>
                            </div>
                        ))}
                    </div>
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
                    Create Task
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;