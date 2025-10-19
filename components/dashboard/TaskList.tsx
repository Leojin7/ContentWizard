import React, { useState, useRef } from 'react';
import Card from '../ui/Card';
import { Task, TaskStatus, TaskPriority } from '../../types';
import { MoreHorizontalIcon, FilterIcon, TrashIcon, XIcon, PlusIcon, EditIcon } from '../icons/Icons';
import { useClickOutside } from '../../hooks/useClickOutside';

const StatusBadge = ({ status }: { status: TaskStatus }) => {
    const statusStyles: { [key in TaskStatus]?: { text: string; bg: string; dot: string } } = {
        [TaskStatus.Received]: { text: 'text-green-dark', bg: 'bg-green-light', dot: 'bg-green-dark' },
        [TaskStatus.Sent]: { text: 'text-blue-dark', bg: 'bg-blue-light', dot: 'bg-blue-dark' },
        [TaskStatus.Payment]: { text: 'text-red-dark', bg: 'bg-red-light', dot: 'bg-red-dark' },
        [TaskStatus.ToDo]: { text: 'text-gray-text', bg: 'bg-light-2', dot: 'bg-gray-text' },
        [TaskStatus.InProgress]: { text: 'text-blue-dark', bg: 'bg-blue-light', dot: 'bg-blue-dark' },
        [TaskStatus.InReview]: { text: 'text-purple-dark', bg: 'bg-purple-light', dot: 'bg-purple-dark'},
        [TaskStatus.Done]: { text: 'text-green-dark', bg: 'bg-green-light', dot: 'bg-green-dark' },
    };
    const style = statusStyles[status] || statusStyles[TaskStatus.ToDo]!;

    return (
        <div className={`inline-flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
            <span>{status}</span>
        </div>
    );
};

const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
    const priorityStyles: { [key in TaskPriority]: { text: string; bg: string; } } = {
        [TaskPriority.High]: { text: 'text-red-dark', bg: 'bg-red-light' },
        [TaskPriority.Medium]: { text: 'text-yellow-dark', bg: 'bg-yellow-light' },
        [TaskPriority.Low]: { text: 'text-gray-text', bg: 'bg-light-2' },
    };
    const style = priorityStyles[priority];
    return (
        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${style.bg} ${style.text}`}>
            {priority}
        </span>
    );
};


// FIX: Defined a props interface for TaskRow and changed it to a React.FC.
// This correctly types the component for React's JSX transform, resolving an issue where the 'key' prop was being checked against component props.
interface TaskRowProps {
    task: Task;
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onDeleteTask, onEditTask }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setDropdownOpen(false));

    return (
        <tr className="border-b border-light-3 last:border-b-0">
            <td className="py-4 pr-3 px-6">
                <div className="flex items-center space-x-3">
                    <img className="h-10 w-10 rounded-full object-cover bg-light" src={task.logo} alt={task.name} />
                    <div>
                        <p className="font-semibold text-dark-text text-sm">{task.name}</p>
                        <p className="text-xs text-gray-text">{task.handle}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 px-3 text-sm text-gray-text hidden xl:table-cell">{task.date}</td>
            <td className="py-4 px-3 hidden lg:table-cell">
                <StatusBadge status={task.status} />
            </td>
            <td className="py-4 px-3 hidden md:table-cell">
                <PriorityBadge priority={task.priority} />
            </td>
            <td className="py-4 px-3 hidden lg:table-cell">
                <div className="flex -space-x-2">
                    {task.assignees.slice(0, 3).map(user => (
                        <img key={user.id} src={user.avatar} alt={user.name} title={user.name} className="w-8 h-8 rounded-full border-2 border-white"/>
                    ))}
                    {task.assignees.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-light-2 flex items-center justify-center text-xs font-bold text-gray-text">
                            +{task.assignees.length - 3}
                        </div>
                    )}
                </div>
            </td>
            <td className="py-4 pl-3 text-right relative px-6">
                 <div ref={dropdownRef}>
                    <button className="text-gray-text hover:text-dark-text p-1" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <MoreHorizontalIcon className="w-5 h-5" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-light-3">
                            <ul className="py-1">
                                <li>
                                    <button
                                        onClick={() => {
                                            onEditTask(task);
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full text-left flex items-center px-4 py-2 text-sm text-dark-text hover:bg-light-2"
                                    >
                                        <EditIcon className="w-4 h-4 mr-2" />
                                        Edit Task
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            onDeleteTask(task.id);
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-dark hover:bg-red-light"
                                    >
                                        <TrashIcon className="w-4 h-4 mr-2" />
                                        Delete Task
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                 </div>
            </td>
        </tr>
    );
};

interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void;
    onAddTaskClick?: () => void;
    onViewAll?: () => void;
    taskFilter: TaskStatus | 'All';
    setTaskFilter: (filter: TaskStatus | 'All') => void;
    isPaginated?: boolean;
}

const FilterDropdown = ({ setTaskFilter }: { setTaskFilter: (filter: TaskStatus | 'All') => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setIsOpen(false));
    
    const statuses = Object.values(TaskStatus).filter(s => ![TaskStatus.Received, TaskStatus.Sent, TaskStatus.Payment].includes(s));

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-light">
                <FilterIcon className="w-5 h-5 text-gray-text" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-light-3">
                    <ul className="py-1">
                        <li>
                            <button onClick={() => { setTaskFilter('All'); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-light-2">All Statuses</button>
                        </li>
                        {statuses.map(status => (
                             <li key={status}>
                                <button onClick={() => { setTaskFilter(status); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-light-2">{status}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onEditTask, onAddTaskClick, onViewAll, taskFilter, setTaskFilter, isPaginated = true }) => {
    return (
        <Card padding="p-0">
            <div className="flex justify-between items-center p-6 pb-2">
                <div>
                    <h3 className="text-lg font-bold text-dark-text">Tasks</h3>
                    <p className="text-sm text-gray-text">Your team's most recent tasks.</p>
                </div>
                <div className="flex items-center space-x-2">
                    {taskFilter !== 'All' && (
                         <div className="flex items-center space-x-2 bg-light-2 pl-3 pr-2 py-1 rounded-full">
                            <span className="text-sm text-dark-text font-semibold">{taskFilter}</span>
                            <button onClick={() => setTaskFilter('All')} className="p-1 rounded-full hover:bg-light">
                                <XIcon className="w-3 h-3 text-gray-text"/>
                            </button>
                         </div>
                    )}
                    <FilterDropdown setTaskFilter={setTaskFilter} />
                    {onAddTaskClick && (
                        <button onClick={onAddTaskClick} className="flex items-center space-x-2 bg-dark text-white font-bold py-2 px-3 rounded-lg hover:bg-opacity-80 text-sm">
                            <PlusIcon className="w-4 h-4"/>
                            <span>Add Task</span>
                        </button>
                    )}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-light-3">
                        <tr>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-text uppercase">Name</th>
                            <th className="py-3 px-3 text-xs font-semibold text-gray-text uppercase hidden xl:table-cell">Date</th>
                            <th className="py-3 px-3 text-xs font-semibold text-gray-text uppercase hidden lg:table-cell">Status</th>
                            <th className="py-3 px-3 text-xs font-semibold text-gray-text uppercase hidden md:table-cell">Priority</th>
                            <th className="py-3 px-3 text-xs font-semibold text-gray-text uppercase hidden lg:table-cell">Assignees</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map(task => <TaskRow key={task.id} task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />)
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-text">No tasks found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {onViewAll && (
                <div className="text-center p-4 border-t border-light-3">
                    <button onClick={onViewAll} className="text-sm font-bold text-dark-text hover:opacity-70">
                        View all tasks
                    </button>
                </div>
            )}
        </Card>
    );
}

export default TaskList;