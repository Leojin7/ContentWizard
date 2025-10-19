import React, { useState, useEffect } from 'react';
import { XIcon } from '../icons/Icons';
import { Task, TaskStatus, TaskPriority, User } from '../../types';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (task: Task) => void;
  taskToEdit: Task | null;
  users: User[];
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, onUpdateTask, taskToEdit, users }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.ToDo);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Medium);
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setAssigneeIds(taskToEdit.assignees.map(a => a.id));
      setDate(taskToEdit.date);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Task name is required.');
      return;
    }
    if (!taskToEdit) return;

    setError('');
    
    const selectedAssignees = users.filter(user => assigneeIds.includes(user.id));
    
    const updatedTask: Task = {
        ...taskToEdit,
        name,
        status,
        priority,
        assignees: selectedAssignees,
        date,
    };

    onUpdateTask(updatedTask);
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
          <h2 className="text-xl font-bold">Edit Task</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-light-2">
            <XIcon className="w-5 h-5 text-gray-text" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                    <label htmlFor="editTaskName" className="block text-sm font-semibold text-dark-text mb-2">Task Name</label>
                    <input
                        id="editTaskName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border-light-3 bg-light rounded-lg shadow-sm focus:ring-dark-text focus:border-dark-text text-sm p-3 font-semibold"
                    />
                     {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="editTaskStatus" className="block text-sm font-semibold text-dark-text mb-2">Status</label>
                        <select id="editTaskStatus" value={status} onChange={e => setStatus(e.target.value as TaskStatus)} className="w-full border-light-3 bg-light rounded-lg shadow-sm focus:ring-dark-text focus:border-dark-text text-sm p-3 font-semibold">
                            {Object.values(TaskStatus).filter(s => ![TaskStatus.Received, TaskStatus.Sent, TaskStatus.Payment].includes(s)).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="editTaskPriority" className="block text-sm font-semibold text-dark-text mb-2">Priority</label>
                        <select id="editTaskPriority" value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="w-full border-light-3 bg-light rounded-lg shadow-sm focus:ring-dark-text focus:border-dark-text text-sm p-3 font-semibold">
                           {Object.values(TaskPriority).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="editTaskDate" className="block text-sm font-semibold text-dark-text mb-2">Date</label>
                    <input
                        id="editTaskDate"
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border-light-3 bg-light rounded-lg shadow-sm focus:ring-dark-text focus:border-dark-text text-sm p-3 font-semibold"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-dark-text mb-2">Assignees</label>
                    <div className="max-h-32 overflow-y-auto bg-light rounded-lg p-2 space-y-2 border border-light-3">
                        {users.map(user => (
                            <div key={user.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-light-2">
                                <input type="checkbox" id={`edit-user-${user.id}`} checked={assigneeIds.includes(user.id)} onChange={() => handleAssigneeChange(user.id)} className="h-4 w-4 rounded text-dark focus:ring-dark-3"/>
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full"/>
                                <label htmlFor={`edit-user-${user.id}`} className="font-semibold text-sm">{user.name}</label>
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
                    className="px-4 py-2 text-sm font-bold text-white bg-dark rounded-lg hover:bg-opacity-80"
                >
                    Save Changes
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;