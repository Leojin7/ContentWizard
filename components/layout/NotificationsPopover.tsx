import React from 'react';
import Popover from '../ui/Popover';

const NotificationItem = ({ icon, text, time }: { icon: string, text: string, time: string }) => (
    <div className="flex items-start space-x-3 p-2 hover:bg-light-2 rounded-lg">
        <div className="w-8 h-8 flex-shrink-0 bg-light-2 rounded-full flex items-center justify-center">{icon}</div>
        <div className="flex-1">
            <p className="text-sm text-dark-text">{text}</p>
            <p className="text-xs text-gray-text">{time}</p>
        </div>
    </div>
);

const NotificationsPopover: React.FC = () => {
  return (
    <Popover>
        <div className="p-2">
            <h3 className="font-bold text-dark-text">Notifications</h3>
        </div>
        <div className="space-y-1">
            <NotificationItem icon="🎉" text="New project 'Website Redesign' has been assigned to you." time="2 hours ago"/>
            <NotificationItem icon="💬" text="Alisa Williams commented on your task 'Write blog post'." time="5 hours ago"/>
            <NotificationItem icon="✅" text="Your task 'Create social media assets' was approved." time="1 day ago"/>
        </div>
         <div className="p-2 mt-1 text-center border-t border-light-3">
            <button className="text-sm font-bold text-dark-text hover:opacity-70">View all notifications</button>
        </div>
    </Popover>
  );
};

export default NotificationsPopover;
