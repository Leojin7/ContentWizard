import React from 'react';
import TaskList from '../dashboard/TaskList';
import { Task, TaskStatus } from '../../types';
import { PlusIcon } from '../icons/Icons';

interface TasksPageProps {
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void;
    onAddTaskClick: () => void;
    taskFilter: TaskStatus | 'All';
    setTaskFilter: (filter: TaskStatus | 'All') => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ tasks, onDeleteTask, onEditTask, onAddTaskClick, taskFilter, setTaskFilter }) => {
  return (
    <div className="p-6">
       <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold text-dark-text">All Tasks</h1>
                <p className="text-gray-text mt-1">Manage and track all tasks for your team.</p>
            </div>
            <button 
                onClick={onAddTaskClick}
                className="flex items-center space-x-2 bg-dark text-white font-bold py-2.5 px-4 rounded-lg hover:bg-opacity-80"
            >
                <PlusIcon className="w-5 h-5" />
                <span>Add Task</span>
            </button>
        </div>
      <TaskList 
        tasks={tasks} 
        onDeleteTask={onDeleteTask} 
        onEditTask={onEditTask}
        onAddTaskClick={onAddTaskClick}
        taskFilter={taskFilter}
        setTaskFilter={setTaskFilter}
        isPaginated={true} 
      />
    </div>
  );
};

export default TasksPage;