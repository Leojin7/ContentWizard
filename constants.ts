import { User, Task, TaskStatus, TaskPriority, ChartDataPoint, TaskAnalyticsDataPoint, Project, ProjectStatus, Country } from './types';
import React from 'react';
import { DashboardIcon, CardsIcon, ReceiptsIcon, ManageIcon, HistoryIcon } from './components/icons/Icons';

export interface NavItem {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    page: string;
}

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
    { icon: DashboardIcon, label: 'Dashboard', page: 'Dashboard' },
    { icon: CardsIcon, label: 'Projects', page: 'Projects' },
    { icon: ReceiptsIcon, label: 'Tasks', page: 'Tasks' },
    { icon: ManageIcon, label: 'Analytics', page: 'Analytics' },
    { icon: HistoryIcon, label: 'History', page: 'History' },
];

export const ALL_USERS: User[] = [
  { id: 'user-1', name: 'Alisa Williams', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', email: 'alisa.w@example.com' },
  { id: 'user-2', name: 'Kari Rasmussen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', email: 'kari.r@example.com' },
  { id: 'user-3', name: 'Nataly Craig', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', email: 'nataly.c@example.com' },
  { id: 'user-4', name: 'Lucy Jones', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', email: 'lucy.j@example.com' },
  { id: 'user-5', name: 'Alec Dawson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d', email: 'alec.d@example.com' },
  { id: 'user-6', name: 'Kelly Williams', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d', email: 'kelly.w@example.com' },
  { id: 'user-7', name: 'Robert Doe', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d', email: 'rob.doe@brisk.com' },
  { id: 'user-8', name: 'John Smith', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d', email: 'john.s@example.com' },
  { id: 'user-9', name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712d', email: 'jane.d@example.com' },
];

export const USERS: User[] = ALL_USERS.slice(0, 5);

export const CURRENT_USER: User = {
    id: 'current-user',
    name: 'Robert Doe',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
    handle: 'rob.doe@brisk.com'
};

export const TASKS: Task[] = [
    { id: 'task-1', name: 'Finalize Q3 Marketing Plan', logo: 'https://tailwindui.com/img/logos/48x48/reform.svg', handle: '#MKT-101', date: '22 July 2024, 16:43', status: TaskStatus.InReview, amount: 0, priority: TaskPriority.High, assignees: [ALL_USERS[0], ALL_USERS[2]] },
    { id: 'task-2', name: 'Develop Landing Page Mockups', logo: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', handle: '#UX-203', date: '21 July 2024, 12:22', status: TaskStatus.InProgress, amount: 0, priority: TaskPriority.High, assignees: [ALL_USERS[1]] },
    { id: 'task-income-1', name: 'Client Payment: Project Alpha', logo: 'https://em-content.zobj.net/source/apple/354/dollar-banknote_1f4b5.png', handle: '#PAY-01', date: '15 July 2024, 10:00', status: TaskStatus.Received, amount: 5500, priority: TaskPriority.High, assignees: [ALL_USERS[6]] },
    { id: 'task-expense-1', name: 'Expense: Figma Subscription', logo: 'https://em-content.zobj.net/source/apple/354/credit-card_1f4b3.png', handle: '#EXP-01', date: '10 July 2024, 09:00', status: TaskStatus.Payment, amount: 350, priority: TaskPriority.Medium, assignees: [ALL_USERS[6]] },
    { id: 'task-3', name: 'Setup Analytics Dashboard', logo: 'https://tailwindui.com/img/logos/48x48/focal-point.svg', handle: '#DATA-01', date: '21 June 2024, 11:38', status: TaskStatus.Done, amount: 0, priority: TaskPriority.Medium, assignees: [ALL_USERS[3], ALL_USERS[4]] },
    { id: 'task-income-2', name: 'Client Payment: Q2 Retainer', logo: 'https://em-content.zobj.net/source/apple/354/dollar-banknote_1f4b5.png', handle: '#PAY-02', date: '15 June 2024, 11:00', status: TaskStatus.Received, amount: 12000, priority: TaskPriority.High, assignees: [ALL_USERS[6]] },
    { id: 'task-expense-2', name: 'Expense: Adobe Creative Cloud', logo: 'https://em-content.zobj.net/source/apple/354/credit-card_1f4b3.png', handle: '#EXP-02', date: '05 June 2024, 09:30', status: TaskStatus.Payment, amount: 89.99, priority: TaskPriority.Medium, assignees: [ALL_USERS[6]] },
    { id: 'task-4', name: 'Write Social Media Copy', logo: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', handle: '#CNT-54', date: '21 May 2024, 10:22', status: TaskStatus.ToDo, amount: 0, priority: TaskPriority.Medium, assignees: [ALL_USERS[2]] },
    { id: 'task-income-3', name: 'Client Payment: Beta Project', logo: 'https://em-content.zobj.net/source/apple/354/dollar-banknote_1f4b5.png', handle: '#PAY-03', date: '20 May 2024, 14:00', status: TaskStatus.Received, amount: 8500, priority: TaskPriority.High, assignees: [ALL_USERS[6]] },
    { id: 'task-expense-3', name: 'Expense: Office Supplies', logo: 'https://em-content.zobj.net/source/apple/354/credit-card_1f4b3.png', handle: '#EXP-03', date: '10 May 2024, 16:00', status: TaskStatus.Payment, amount: 245.50, priority: TaskPriority.Low, assignees: [ALL_USERS[6]] },
    { id: 'task-5', name: 'Review Customer Feedback', logo: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', handle: '#SUP-89', date: '20 April 2024, 16:43', status: TaskStatus.ToDo, amount: 0, priority: TaskPriority.Low, assignees: [ALL_USERS[0]] },
    { id: 'task-income-4', name: 'Client Payment: Gamma Project', logo: 'https://em-content.zobj.net/source/apple/354/dollar-banknote_1f4b5.png', handle: '#PAY-04', date: '18 April 2024, 14:00', status: TaskStatus.Received, amount: 10245.23, priority: TaskPriority.High, assignees: [ALL_USERS[6]] },
    { id: 'task-expense-4', name: 'Expense: Vercel Hosting', logo: 'https://em-content.zobj.net/source/apple/354/credit-card_1f4b3.png', handle: '#EXP-04', date: '01 April 2024, 10:00', status: TaskStatus.Payment, amount: 40, priority: TaskPriority.Medium, assignees: [ALL_USERS[6]] },
    { id: 'task-6', name: 'Update Email Templates', logo: 'https://i.pravatar.cc/150?u=a042581f4e29026708d', handle: '#DES-12', date: '20 March 2024, 18:43', status: TaskStatus.Done, amount: 0, priority: TaskPriority.Low, assignees: [ALL_USERS[4]] },
    { id: 'task-7', name: 'Fix Login Page Bug', logo: 'https://i.pravatar.cc/150?u=a042581f4e29026710d', handle: '#ENG-404', date: '19 February 2024, 20:22', status: TaskStatus.InProgress, amount: 0, priority: TaskPriority.High, assignees: [ALL_USERS[5], ALL_USERS[1]] },
    { id: 'task-income-5', name: 'Client Payment: Consulting', logo: 'https://em-content.zobj.net/source/apple/354/dollar-banknote_1f4b5.png', handle: '#PAY-05', date: '15 March 2024, 14:00', status: TaskStatus.Received, amount: 9500, priority: TaskPriority.High, assignees: [ALL_USERS[6]] },
    { id: 'task-expense-5', name: 'Expense: Travel for Conference', logo: 'https://em-content.zobj.net/source/apple/354/credit-card_1f4b3.png', handle: '#EXP-05', date: '1 March 2024, 10:00', status: TaskStatus.Payment, amount: 1200, priority: TaskPriority.High, assignees: [ALL_USERS[6]] },
];

export const PROJECTS: Project[] = [
    { id: 'proj-1', name: 'Website Redesign', description: 'Complete overhaul of the company website with a new design system.', status: ProjectStatus.InProgress, members: USERS.slice(0, 3) },
    { id: 'proj-2', name: 'Q3 Marketing Campaign', description: 'Launch a new marketing campaign for the upcoming quarter.', status: ProjectStatus.ToDo, members: USERS.slice(2, 5) },
    { id: 'proj-3', name: 'Mobile App Development', description: 'Develop a new mobile application for iOS and Android.', status: ProjectStatus.InProgress, members: USERS.slice(1, 4) },
    { id: 'proj-4', name: 'API Integration', description: 'Integrate a new third-party API into our system.', status: ProjectStatus.Done, members: USERS.slice(0, 2) },
    { id: 'proj-5', name: 'Content Strategy Plan', description: 'Develop a comprehensive content strategy for the next fiscal year.', status: ProjectStatus.ToDo, members: USERS.slice(3, 5) },
];

export const COUNTRIES: Country[] = [
    { code: 'us', name: 'USA' },
    { code: 'in', name: 'India' },
    { code: 'de', name: 'Germany' },
    { code: 'jp', name: 'Japan' },
];

export const TASK_ANALYTICS_DATA: TaskAnalyticsDataPoint[] = [
  { name: 'Mon', created: 20, completed: 15 },
  { name: 'Tue', created: 30, completed: 25 },
  { name: 'Wed', created: 25, completed: 22 },
  { name: 'Thu', created: 40, completed: 35 },
  { name: 'Fri', created: 35, completed: 30 },
  { name: 'Sat', created: 10, completed: 8 },
  { name: 'Sun', created: 5, completed: 5 },
];