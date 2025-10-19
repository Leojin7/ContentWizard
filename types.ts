

export enum TaskStatus {
  Received = 'Received',
  Sent = 'Sent',
  Payment = 'Payment',
  Done = 'Done',
  InProgress = 'In Progress',
  InReview = 'In Review',
  ToDo = 'To Do',
}

export enum TaskPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface User {
  id: string;
  name:string;
  avatar: string;
  handle?: string;
  email?: string;
  password?: string;
}

export interface Task {
  id: string;
  name: string;
  logo: string;
  handle: string;
  date: string;
  status: TaskStatus;
  amount: number;
  priority: TaskPriority;
  assignees: User[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface TaskAnalyticsDataPoint {
  name: string;
  created: number;
  completed: number;
}

export enum ProjectStatus {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done',
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    members: User[];
}

export interface UserSettings {
    profile: User;
}

export interface Country {
    code: string;
    name: string;
}

export enum HistoryActionType {
    TASK_CREATED = 'TASK_CREATED',
    TASK_UPDATED = 'TASK_UPDATED',
    TASK_DELETED = 'TASK_DELETED',
    PROJECT_CREATED = 'PROJECT_CREATED',
    USER_ADDED = 'USER_ADDED',
    USER_REMOVED = 'USER_REMOVED',
    SETTINGS_UPDATED = 'SETTINGS_UPDATED',
}

export interface HistoryItem {
    id: string;
    action: HistoryActionType;
    message: string;
    timestamp: Date;
}