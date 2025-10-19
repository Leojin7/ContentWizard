import React from 'react';
import { NavItem as NavItemType } from '../../constants';
import { LogoIcon, MenuIcon, AddSectionIcon, SettingsIcon } from '../icons/Icons';
import { User } from '../../types';

export interface NavItemProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    active?: boolean;
    onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active = false, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 text-sm font-semibold rounded-xl transition-colors duration-200 text-left ${
        active ? 'bg-dark-2' : 'hover:bg-dark-2/60'
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-colors duration-200 ${
        active ? 'bg-dark-3 text-light-text' : 'bg-dark-2 text-gray-text'
      }`}>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <span className={`transition-colors duration-200 ${active ? 'text-light-text' : 'text-gray-text'}`}>
        {label}
      </span>
    </button>
);


const UserProfile = ({ user, onSettingsClick, onLogout }: { user: User; onSettingsClick: () => void; onLogout: () => void; }) => {
  return (
    <div className="flex items-center space-x-3 p-2">
      <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.name} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-light-text truncate">{user.name}</p>
        <p className="text-xs text-gray-text truncate">{user.handle}</p>
      </div>
      <div className="flex items-center space-x-1">
        <button className="text-gray-text hover:text-light-text flex-shrink-0 p-1.5" onClick={onSettingsClick} title="Settings">
            <SettingsIcon className="w-5 h-5" />
        </button>
        <button onClick={onLogout} className="text-gray-text hover:text-light-text flex-shrink-0 p-1.5" title="Logout">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
       </div>
    </div>
  );
};

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    activePage: string;
    setActivePage: (page: string) => void;
    navItems: NavItemType[];
    onAddSection: () => void;
    user: User;
    onLogout: () => void;
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, activePage, setActivePage, navItems, onAddSection, user, onLogout }: SidebarProps) {

  const SidebarContent = () => (
     <>
        <div className="flex items-center h-20 px-4">
            <div className="flex items-center space-x-3">
                <LogoIcon className="w-8 h-8 text-light-text" />
                <span className="text-xl font-bold text-light-text">Content Wizard</span>
            </div>
            <button className="text-gray-text hover:text-light-text lg:hidden ml-auto" onClick={() => setIsSidebarOpen(false)}>
                <MenuIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="flex-1 flex flex-col justify-between overflow-y-auto px-4">
            <nav className="space-y-2">
            {navItems.map((item) => (
                <NavItem 
                    key={item.label} 
                    icon={item.icon} 
                    label={item.label} 
                    active={activePage === item.page} 
                    onClick={() => setActivePage(item.page)} 
                />
            ))}
            </nav>
            <div>
              <div className="py-2">
                  <button onClick={onAddSection} className="flex items-center w-full p-3 text-sm font-semibold rounded-xl text-gray-text hover:bg-dark-2/60">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 bg-dark-2 text-gray-text">
                        <AddSectionIcon className="w-5 h-5" />
                      </div>
                      <span>Add a section</span>
                  </button>
              </div>
              <div className="pb-4">
                <UserProfile user={user} onSettingsClick={() => setActivePage('Settings')} onLogout={onLogout} />
              </div>
            </div>
        </div>
    </>
  );

  return (
    <>
    {/*  Sidebar for mobile improvement*/}
        
    <div className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
        <aside className="relative z-10 w-72 flex flex-col bg-black/70 backdrop-blur-2xl border-r border-white/10 text-light-text h-full">
            <SidebarContent />
        </aside>
    </div>

    {/* Desktop Sidebar */}
    <aside className="w-72 flex-col bg-black/70 backdrop-blur-2xl border-r border-white/10 text-light-text hidden lg:flex shrink-0">
        <SidebarContent />
    </aside>
    </>
  );
}
