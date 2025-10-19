import React, { useState, useRef } from 'react';
import Card from '../ui/Card';
import { ArrowDownIcon, SendIcon, RequestIcon } from '../icons/Icons';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Country } from '../../types';
import { COUNTRIES } from '../../constants';

interface ProjectStatsCardProps {
    projectCount: number;
    selectedCountry: Country;
    onCountryChange: (country: Country) => void;
    onAssignClick: () => void;
    onRequestClick: () => void;
}

const ProjectStatsCard: React.FC<ProjectStatsCardProps> = ({ projectCount, selectedCountry, onCountryChange, onAssignClick, onRequestClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

    const handleCountrySelect = (country: Country) => {
        onCountryChange(country);
        setIsDropdownOpen(false);
    };

    return (
        <Card className="flex flex-col">
            <div className="flex justify-between items-center mb-1 relative" ref={dropdownRef}>
                <span className="text-sm font-semibold text-gray-text">Team Projects</span>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 text-sm font-bold p-1 rounded-md hover:bg-light-2">
                    <img src={`https://flagcdn.com/w20/${selectedCountry.code}.png`} alt={`${selectedCountry.name} Flag`} className="w-5 h-5" />
                    <span>{selectedCountry.name}</span>
                    <ArrowDownIcon className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20 border border-light-3">
                        <ul className="py-1">
                            {COUNTRIES.map(country => (
                                <li key={country.code}>
                                    <button 
                                        onClick={() => handleCountrySelect(country)}
                                        className="w-full flex items-center space-x-2 text-left px-4 py-2 text-sm text-dark-text hover:bg-light-2"
                                    >
                                        <img src={`https://flagcdn.com/w20/${country.code}.png`} alt={`${country.name} Flag`} className="w-5 h-5" />
                                        <span>{country.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex-grow flex flex-col justify-center">
                <p className="text-xs text-gray-text mb-1">Total Projects</p>
                <h2 className="text-4xl font-bold text-dark-text tracking-tighter">
                    {projectCount}
                </h2>
            </div>
            <div className="flex items-center justify-around mt-4">
                <button 
                    onClick={onAssignClick}
                    className="flex items-center space-x-2 text-sm font-semibold text-dark-text hover:text-opacity-70"
                >
                    <div className="p-2.5 rounded-full bg-light">
                       <SendIcon className="w-5 h-5" />
                    </div>
                    <span>Assign</span>
                </button>
                <button 
                    onClick={onRequestClick}
                    className="flex items-center space-x-2 text-sm font-semibold text-dark-text hover:text-opacity-70"
                >
                    <div className="p-2.5 rounded-full bg-light">
                        <RequestIcon className="w-5 h-5" />
                    </div>
                    <span>Request</span>
                </button>
            </div>
        </Card>
    );
};

export default ProjectStatsCard;