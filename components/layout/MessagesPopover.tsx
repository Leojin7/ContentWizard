import React from 'react';
import Popover from '../ui/Popover';
import { USERS } from '../../constants';

const MessageItem = ({ user, text, time }: { user: typeof USERS[0], text: string, time: string }) => (
    <div className="flex items-start space-x-3 p-2 hover:bg-light-2 rounded-lg">
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-dark-text">{user.name}</p>
                <p className="text-xs text-gray-text">{time}</p>
            </div>
            <p className="text-sm text-gray-text truncate">{text}</p>
        </div>
    </div>
);

const MessagesPopover: React.FC = () => {
  return (
    <Popover>
        <div className="p-2">
            <h3 className="font-bold text-dark-text">Messages</h3>
        </div>
        <div className="space-y-1">
            <MessageItem user={USERS[0]} text="Hey, can you take a look at the latest designs for the landing page?" time="5m"/>
            <MessageItem user={USERS[1]} text="Sure, I'll have the report ready by EOD." time="1h"/>
            <MessageItem user={USERS[2]} text="Meeting reminder for 3 PM today." time="4h"/>
        </div>
         <div className="p-2 mt-1 text-center border-t border-light-3">
            <button className="text-sm font-bold text-dark-text hover:opacity-70">View all messages</button>
        </div>
    </Popover>
  );
};

export default MessagesPopover;
