import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { UserSettings, User } from '../../types';
import { ALL_USERS } from '../../constants';
import { PlusIcon, TrashIcon } from '../icons/Icons';

interface SettingsPageProps {
    settings: UserSettings;
    teamMembers: User[];
    onUpdateSettings: (settings: UserSettings) => void;
    onAddMember: (userId: string) => void;
    onRemoveMember: (userId: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, teamMembers, onUpdateSettings, onAddMember, onRemoveMember }) => {
    const [profileData, setProfileData] = useState(settings.profile);
    const [memberToAdd, setMemberToAdd] = useState('');

    useEffect(() => {
        setProfileData(settings.profile);
    }, [settings]);

    const handleProfileUpdate = () => {
        onUpdateSettings({ ...settings, profile: profileData });
    };

    const handleAddMemberClick = () => {
        if (memberToAdd) {
            onAddMember(memberToAdd);
            setMemberToAdd('');
        }
    };
    
    const availableUsers = ALL_USERS.filter(u => !teamMembers.some(tm => tm.id === u.id));

    return (
    <div className="p-6">
      <Card>
        <h1 className="text-2xl font-bold text-dark-text">Settings</h1>
        <p className="text-gray-text mt-2">Manage your account, API keys, notification preferences, and team settings.</p>
        
        <div className="mt-8 space-y-8">
            {/* Profile Section */}
            <div>
                <h2 className="text-lg font-bold border-b border-light-3 pb-2 mb-4">Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-dark-text mb-1">Full Name</label>
                        <input type="text" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full bg-light rounded-lg p-2.5 text-sm font-semibold border border-light-3"/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-dark-text mb-1">Email Address</label>
                        <input type="email" value={profileData.email || ''} onChange={e => setProfileData({...profileData, email: e.target.value})} className="w-full bg-light rounded-lg p-2.5 text-sm font-semibold border border-light-3"/>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                     <img src={profileData.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
                     <button onClick={() => setProfileData({...profileData, avatar: `https://i.pravatar.cc/150?u=${Date.now()}`})} className="text-sm font-bold bg-light py-2 px-4 rounded-lg hover:bg-light-2">Change Avatar</button>
                </div>
                <button onClick={handleProfileUpdate} className="mt-4 bg-dark text-white font-bold py-2.5 px-4 rounded-lg hover:bg-opacity-80">Update Profile</button>
            </div>

            {/* Team Management */}
            <div>
                <h2 className="text-lg font-bold border-b border-light-3 pb-2 mb-4">Team Management</h2>
                <div className="space-y-3">
                    {teamMembers.map(member => (
                        <div key={member.id} className="flex items-center justify-between bg-light p-3 rounded-lg">
                           <div className="flex items-center space-x-3">
                                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-sm text-gray-text">{member.email}</p>
                                </div>
                           </div>
                           <button onClick={() => onRemoveMember(member.id)} className="p-2 rounded-full hover:bg-red-light text-red-dark">
                               <TrashIcon className="w-5 h-5" />
                           </button>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex items-center space-x-2">
                    <select value={memberToAdd} onChange={e => setMemberToAdd(e.target.value)} className="flex-grow bg-light rounded-lg p-2.5 text-sm font-semibold border border-light-3">
                        <option value="">Select a user to add...</option>
                        {availableUsers.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <button onClick={handleAddMemberClick} className="flex items-center space-x-2 bg-dark text-white font-bold py-2.5 px-4 rounded-lg hover:bg-opacity-80">
                        <PlusIcon className="w-5 h-5"/>
                        <span>Add Member</span>
                    </button>
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;