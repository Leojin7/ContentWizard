import React from 'react';

type IconProps = { className?: string; };

export const LogoIcon = ({ className }: IconProps) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.91L22 12L15.09 15.09L12 22L8.91 15.09L2 12L8.91 8.91L12 2Z" fill="currentColor"/>
    </svg>
);
export const MenuIcon = ({ className }: IconProps) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const DashboardIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.5" y="2.5" width="6.66667" height="6.66667" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2.5" y="10.833" width="6.66667" height="6.66667" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10.833" y="2.5" width="6.66667" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);
export const CardsIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.5" y="5" width="15" height="11.6667" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5.83301 5V4.16667C5.83301 3.24619 6.5792 2.5 7.49967 2.5H17.4997C18.4201 2.5 19.1663 3.24619 19.1663 4.16667V11.6667" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
    </svg>
);
export const ReceiptsIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83301 2.5H14.1663L17.4997 5.83333V17.5C17.4997 17.9594 17.126 18.3333 16.6663 18.3333H3.33301C2.87325 18.3333 2.49967 17.9594 2.49967 17.5V3.33333C2.49967 2.87358 2.87325 2.5 3.33301 2.5H5.83301Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6.66699 14.167H13.3337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6.66699 10.833H13.3337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6.66699 7.5H9.16699" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
export const ManageIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16699 15.8333V4.16667L8.33366 5.83333L12.5003 4.16667L15.8337 5.83333V15.8333L12.5003 14.1667L8.33366 15.8333L4.16699 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const HistoryIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 5.83301V9.99967L12.5 12.4997" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.167 2.5L17.5003 5.83333H14.167V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const AddSectionIcon = ({ className }: IconProps) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3.33301V12.6663" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.33301 8H12.6663" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const SettingsIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.33301 2.5L10.833 5.83333L14.1663 4.16667L15.833 7.5L12.4997 9.16667L14.1663 12.5L10.833 14.1667L12.4997 17.5L9.16634 15.8333L6.66634 17.5L4.99967 14.1667L8.33301 12.5L5.83301 9.16667L2.49967 10.8333L3.33301 7.5L5.83301 5.83333L4.16634 2.5L8.33301 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const SearchIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const BellIcon = ({ className }: IconProps) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C12.5523 21 13 20.5523 13 20H11C11 20.5523 11.4477 21 12 21Z" fill="currentColor"></path><path d="M18 17.5C18 17.5 18 15.5 18 11C18 6.58172 14.4183 3 10 3V3C5.58172 3 2 6.58172 2 11C2 15.5 2 17.5 2 17.5H18Z" stroke="currentColor" strokeWidth="2"></path></svg>
);
export const MessageIcon = ({ className }: IconProps) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 20.25V5.75C3 5.05964 3.55964 4.5 4.25 4.5H19.75C20.4404 4.5 21 5.05964 21 5.75V15.25C21 15.9404 20.4404 16.5 19.75 16.5H7.38135L3 20.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const ArrowDownIcon = ({ className }: IconProps) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const SendIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L17.5 10M17.5 10L12.5 5M17.5 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const RequestIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 5L2.5 10M2.5 10L7.5 15M2.5 10H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const ChevronRightIcon = ({ className }: IconProps) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const PlusIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4.16699V15.8337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.16699 10H15.8337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const SlidersIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.83301 17.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.83301 7.5V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.167 17.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.167 10V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3.33301 10H8.33301" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.667 10H16.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
);
export const MoreHorizontalIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="1.25" transform="rotate(90 10 10)" fill="currentColor"></circle><circle cx="15" cy="10" r="1.25" transform="rotate(90 15 10)" fill="currentColor"></circle><circle cx="5" cy="10" r="1.25" transform="rotate(90 5 10)" fill="currentColor"></circle></svg>
);
export const FilterIcon = ({ className }: IconProps) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><path d="M7.5 15H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
);
export const ExchangeIcon = ({ className }: IconProps) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 4V14H21L16 20L11 14H15V4H17Z" fill="currentColor"></path><path d="M7 20V10H3L8 4L13 10H9V20H7Z" fill="currentColor"></path></svg>
);
export const XIcon = ({ className }: IconProps) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const SparklesIcon = ({ className }: IconProps) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L9.65 8.35L4 10.5L9.65 12.65L12 18L14.35 12.65L20 10.5L14.35 8.35L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 21L6 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 21L18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const TrashIcon = ({ className }: IconProps) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const EditIcon = ({ className }: IconProps) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);