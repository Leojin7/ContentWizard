import React from 'react';
import Card from '../ui/Card';
import { HistoryItem, HistoryActionType } from '../../types';
// FIX: Removed unused and incorrect 'User' type import from '../icons/Icons' and consolidated icon imports.
import { PlusIcon, EditIcon, TrashIcon, SettingsIcon, CardsIcon } from '../icons/Icons';

const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}


const ActionIcon = ({ action }: { action: HistoryActionType }) => {
    const iconStyles = "w-5 h-5";
    const iconMap: Record<HistoryActionType, React.ReactNode> = {
        [HistoryActionType.TASK_CREATED]: <PlusIcon className={iconStyles} />,
        [HistoryActionType.TASK_UPDATED]: <EditIcon className={iconStyles} />,
        [HistoryActionType.TASK_DELETED]: <TrashIcon className={iconStyles} />,
        [HistoryActionType.PROJECT_CREATED]: <CardsIcon className={iconStyles} />,
        [HistoryActionType.USER_ADDED]: <PlusIcon className={iconStyles} />,
        [HistoryActionType.USER_REMOVED]: <TrashIcon className={iconStyles} />,
        [HistoryActionType.SETTINGS_UPDATED]: <SettingsIcon className={iconStyles} />,
    };

    const colorMap: Record<HistoryActionType, string> = {
        [HistoryActionType.TASK_CREATED]: 'bg-green-light text-green-dark',
        [HistoryActionType.TASK_UPDATED]: 'bg-blue-light text-blue-dark',
        [HistoryActionType.TASK_DELETED]: 'bg-red-light text-red-dark',
        [HistoryActionType.PROJECT_CREATED]: 'bg-purple-light text-purple-dark',
        [HistoryActionType.USER_ADDED]: 'bg-green-light text-green-dark',
        [HistoryActionType.USER_REMOVED]: 'bg-red-light text-red-dark',
        [HistoryActionType.SETTINGS_UPDATED]: 'bg-yellow-light text-yellow-dark',
    };

    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorMap[action]}`}>
            {iconMap[action]}
        </div>
    );
};


const HistoryLogItem: React.FC<{ item: HistoryItem }> = ({ item }) => {
    return (
        <div className="flex items-start space-x-4 py-4">
            <ActionIcon action={item.action} />
            <div className="flex-grow">
                <p className="font-semibold text-dark-text text-sm">{item.message}</p>
                <p className="text-xs text-gray-text mt-1">{formatTimeAgo(item.timestamp)}</p>
            </div>
        </div>
    );
};


const HistoryPage: React.FC<{ history: HistoryItem[] }> = ({ history }) => {
  return (
    <div className="p-6">
      <Card>
        <div className="border-b border-light-3 pb-4">
            <h1 className="text-2xl font-bold text-dark-text">Action History</h1>
            <p className="text-gray-text mt-2">An audit log of all activities, including task creation, content generation, and team member changes.</p>
        </div>
        <div className="divide-y divide-light-3">
            {history.length > 0 ? (
                history.map(item => <HistoryLogItem key={item.id} item={item} />)
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-text font-semibold">No history yet.</p>
                    <p className="text-gray-text text-sm">Create a task or project to get started.</p>
                </div>
            )}
        </div>
      </Card>
    </div>
  );
};

export default HistoryPage;