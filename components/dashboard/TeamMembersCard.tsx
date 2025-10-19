import React from 'react';
import Card from '../ui/Card';
import { ChevronRightIcon, PlusIcon, SlidersIcon } from '../icons/Icons';
import { User } from '../../types';

interface TeamMembersCardProps {
    users: User[];
    onManageClick: () => void;
}

const TeamMembersCard: React.FC<TeamMembersCardProps> = ({ users, onManageClick }) => {
    return (
        <Card className="flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-gray-text">Team Members</span>
                <button className="text-gray-text hover:text-dark-text">
                   <ChevronRightIcon className="w-4 h-4"/>
                </button>
            </div>
            <p className="text-sm text-gray-text mb-4">Send or Request from your contact list</p>
            <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                    {users.slice(-5).reverse().map((user) => (
                        <img
                        key={user.id}
                        className="h-10 w-10 rounded-full object-cover border-2 border-white"
                        src={user.avatar}
                        alt={user.name}
                        title={user.name}
                        />
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={onManageClick}
                        className="flex items-center space-x-2 text-sm font-bold bg-dark text-white py-2.5 px-4 rounded-lg hover:bg-opacity-80">
                        <PlusIcon className="w-5 h-5" />
                        <span>Add new</span>
                    </button>
                    <button 
                        onClick={onManageClick}
                        className="flex items-center space-x-2 text-sm font-bold bg-light py-2.5 px-4 rounded-lg hover:bg-light-2">
                        <SlidersIcon className="w-5 h-5" />
                        <span>Manage</span>
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default TeamMembersCard;