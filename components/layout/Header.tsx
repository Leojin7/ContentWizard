import React, { useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { SearchIcon, BellIcon, MessageIcon, MenuIcon } from '../icons/Icons';
import NotificationsPopover from './NotificationsPopover';
import MessagesPopover from './MessagesPopover';

interface HeaderProps {
    onSearchChange: (term: string) => void;
    onMenuClick: () => void;
    isNotificationsOpen: boolean;
    setIsNotificationsOpen: (isOpen: boolean) => void;
    isMessagesOpen: boolean;
    setIsMessagesOpen: (isOpen: boolean) => void;
}

export default function Header({ 
    onSearchChange, 
    onMenuClick,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isMessagesOpen,
    setIsMessagesOpen,
}: HeaderProps) {
  const notificationsRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useClickOutside(notificationsRef, () => setIsNotificationsOpen(false));
  useClickOutside(messagesRef, () => setIsMessagesOpen(false));

  const handleNotificationsClick = () => {
    setIsMessagesOpen(false);
    setIsNotificationsOpen(!isNotificationsOpen);
  };
  
  const handleMessagesClick = () => {
    setIsNotificationsOpen(false);
    setIsMessagesOpen(!isMessagesOpen);
  };

  return (
    <header className="flex-shrink-0 bg-white border-b border-light-3">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center w-full max-w-lg">
          <button onClick={onMenuClick} className="lg:hidden mr-4 text-dark-text">
              <MenuIcon className="h-6 w-6" />
          </button>
          <div className="relative w-full">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-light rounded-lg pl-11 pr-4 py-2.5 text-sm font-semibold placeholder-gray-text text-dark-text focus:outline-none focus:ring-2 focus:ring-gray-300"
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-text border border-gray-300 rounded-md px-1.5 py-0.5 font-mono">
              ⌘ F
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <div className="relative" ref={notificationsRef}>
            <button className="p-2 rounded-full hover:bg-light-2 relative" onClick={handleNotificationsClick}>
              <BellIcon className="w-6 h-6 text-gray-text" />
              <span className="absolute top-2 right-2.5 block h-1.5 w-1.5 rounded-full bg-red-dark ring-2 ring-white"></span>
            </button>
            {isNotificationsOpen && <NotificationsPopover />}
          </div>
          <div className="relative" ref={messagesRef}>
            <button className="p-2 rounded-full hover:bg-light-2" onClick={handleMessagesClick}>
              <MessageIcon className="w-6 h-6 text-gray-text" />
            </button>
            {isMessagesOpen && <MessagesPopover />}
          </div>
        </div>
      </div>
    </header>
  );
}
