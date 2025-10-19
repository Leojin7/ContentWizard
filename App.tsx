

import React, { useState, useCallback, useEffect } from 'react';
import Sidebar, { NavItem as NavItemComponent } from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/pages/Dashboard';
import ProjectsPage from './components/pages/ProjectsPage';
import TasksPage from './components/pages/TasksPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import HistoryPage from './components/pages/HistoryPage';
import SettingsPage from './components/pages/SettingsPage';
import LandingPage from './components/pages/LandingPage';
import { Task, User, TaskStatus, Project, ProjectStatus, UserSettings, Country, TaskPriority, HistoryItem, HistoryActionType } from './types';
import { TASKS, USERS, SIDEBAR_NAV_ITEMS, NavItem as NavItemType, PROJECTS, COUNTRIES, ALL_USERS } from './constants';
import { DashboardIcon } from './components/icons/Icons';
import CreateTaskModal from './components/tasks/CreateTaskModal';
import EditTaskModal from './components/tasks/EditTaskModal';
import { generateTaskListForProject } from './services/geminiService';

const APP_STATE_KEY = 'contentWizardAppState';

const getInitialState = () => {
  try {
    const savedState = localStorage.getItem(APP_STATE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Revive date strings into Date objects
      if (parsedState.history) {
        parsedState.history.forEach((item: HistoryItem) => {
          item.timestamp = new Date(item.timestamp);
        });
      }
      return parsedState;
    }
  } catch (error) {
    console.error("Failed to parse state from localStorage", error);
  }
  return null;
}

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [users, setUsers] = useState<User[]>(USERS);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>({ profile: USERS[6] });
  const [navItems, setNavItems] = useState<NavItemType[]>(SIDEBAR_NAV_ITEMS);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [taskFilter, setTaskFilter] = useState<TaskStatus | 'All'>('All');
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [projectPageView, setProjectPageView] = useState<'kanban' | 'list'>('kanban');
  
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedState = getInitialState();
    if (savedState) {
      setTasks(savedState.tasks || TASKS);
      setUsers(savedState.users || USERS);
      setProjects(savedState.projects || PROJECTS);
      setHistory(savedState.history || []);
      setUserSettings(savedState.userSettings || { profile: USERS[6] });
      setNavItems(savedState.navItems || SIDEBAR_NAV_ITEMS);
      setIsAuthenticated(savedState.isAuthenticated || false);
      setCurrentUser(savedState.currentUser || null);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      const appState = {
        tasks,
        users,
        projects,
        history,
        userSettings,
        navItems,
        isAuthenticated,
        currentUser,
      };
      localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
    }
  }, [tasks, users, projects, history, userSettings, navItems, isAuthenticated, currentUser, isInitialized]);


  const addHistoryItem = useCallback((action: HistoryActionType, message: string) => {
    const newHistoryItem: HistoryItem = {
      id: `hist-${Date.now()}`,
      action,
      message,
      timestamp: new Date(),
    };
    setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
  }, []);

  const handleAddTask = useCallback((taskData: Partial<Omit<Task, 'id'>> & Pick<Omit<Task, 'id'>, 'name'>) => {
    const defaults = {
        logo: 'https://em-content.zobj.net/source/apple/354/clipboard_1f4cb.png',
        handle: `#TASK-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: TaskStatus.ToDo,
        amount: 0,
        priority: TaskPriority.Medium,
        assignees: [],
    };

    const taskWithId: Task = {
        ...defaults,
        ...taskData,
        id: `task-${Date.now()}-${Math.random()}`
    };
    setTasks(prevTasks => [taskWithId, ...prevTasks]);
    setIsCreateTaskModalOpen(false);
    addHistoryItem(HistoryActionType.TASK_CREATED, `Created task: "${taskWithId.name}"`);
  }, [addHistoryItem]);

  const handleDeleteTask = useCallback((taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const taskToDelete = tasks.find(task => task.id === taskId);
      if (taskToDelete) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        addHistoryItem(HistoryActionType.TASK_DELETED, `Deleted task: "${taskToDelete.name}"`);
      }
    }
  }, [tasks, addHistoryItem]);

  const handleEditTaskClick = (task: Task) => {
    setEditingTask(task);
    setIsEditTaskModalOpen(true);
  };
  
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setIsEditTaskModalOpen(false);
    setEditingTask(null);
    addHistoryItem(HistoryActionType.TASK_UPDATED, `Updated task: "${updatedTask.name}"`);
  };

  const handleAddSection = () => {
    const newSectionName = prompt("Enter the name for the new section:");
    if (newSectionName) {
      // FIX: The `icon` property expects a React component type, not a JSX element.
      // Changed `<DashboardIcon ... />` to `DashboardIcon` to match the `NavItem` interface.
      const newNavItem: NavItemType = {
        label: newSectionName,
        icon: DashboardIcon,
        page: newSectionName,
      };
      setNavItems(prevItems => [...prevItems, newNavItem]);
      setActivePage(newSectionName);
    }
  };

  const generateAndAddTasks = useCallback(async (project: Project) => {
    alert('🤖 AI is generating suggested tasks for your new project. This may take a moment...');
    try {
        const taskNames = await generateTaskListForProject(project.name, project.description);
        taskNames.forEach(name => {
            handleAddTask({ name, logo: 'https://em-content.zobj.net/source/apple/354/robot_1f916.png' });
        });
        alert(`✅ ${taskNames.length} AI-suggested tasks have been added to your task list!`);
        setActivePage('Tasks');
    } catch (error) {
        console.error("Failed to generate tasks:", error);
        alert("❌ Could not generate AI tasks. Please try again.");
    }
  }, [handleAddTask]);

  const handleCreateProject = useCallback((project: Omit<Project, 'id' | 'status' | 'members'>, generateTasks: boolean) => {
      const newProject: Project = {
        ...project,
        id: `proj-${Date.now()}`,
        status: ProjectStatus.ToDo,
        members: [users[0], users[1]], // Assign first two users by default
      };
      setProjects(prev => [newProject, ...prev]);
      addHistoryItem(HistoryActionType.PROJECT_CREATED, `Created project: "${newProject.name}"`);

      if (generateTasks) {
          generateAndAddTasks(newProject);
      }
  }, [users, addHistoryItem, generateAndAddTasks]);
  
  const handleUpdateSettings = (newSettings: UserSettings) => {
      setUserSettings(newSettings);
      setCurrentUser(newSettings.profile); // Also update currentUser
      alert('Settings updated successfully!');
      addHistoryItem(HistoryActionType.SETTINGS_UPDATED, `Updated profile information for ${newSettings.profile.name}.`);
  };

  const handleAddTeamMember = (userId: string) => {
      const userToAdd = ALL_USERS.find(u => u.id === userId);
      if (userToAdd && !users.find(u => u.id === userId)) {
          setUsers(prev => [...prev, userToAdd]);
          addHistoryItem(HistoryActionType.USER_ADDED, `Added team member: ${userToAdd.name}.`);
      }
  };

  const handleRemoveTeamMember = (userId: string) => {
      if (users.length <= 2) {
          alert("Cannot remove member. Minimum of 2 team members required.");
          return;
      }
      const userToRemove = users.find(u => u.id === userId);
      if (userToRemove) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        addHistoryItem(HistoryActionType.USER_REMOVED, `Removed team member: ${userToRemove.name}.`);
      }
  };

  const handleLogin = (email: string) => {
    // Mock login: find user by email. In real app, you'd validate password.
    const user = [...ALL_USERS, ...users].find(u => u.email === email);
    if (user) {
        setCurrentUser(user);
        setUserSettings({ profile: user });
        setIsAuthenticated(true);
        setActivePage('Dashboard');
    } else {
        alert('User not found. Please sign up.');
    }
  };

  const handleSignup = (name: string, email: string) => {
    const existingUser = [...ALL_USERS, ...users].find(u => u.email === email);
    if (existingUser) {
        alert('An account with this email already exists.');
        return;
    }
    const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        handle: email,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setUserSettings({ profile: newUser });
    setIsAuthenticated(true);
    setActivePage('Dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem(APP_STATE_KEY);
  };
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = taskFilter === 'All' || task.status === taskFilter;
    return matchesSearch && matchesFilter;
  });

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard 
          tasks={filteredTasks}
          users={users}
          projects={projects}
          onAddTask={handleAddTask}
          onAddTaskClick={() => setIsCreateTaskModalOpen(true)}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTaskClick}
          setActivePage={setActivePage}
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
        />;
      case 'Projects':
        return <ProjectsPage
          projects={projects}
          users={users}
          view={projectPageView}
          setView={setProjectPageView}
          onCreateProject={handleCreateProject}
         />;
      case 'Tasks':
        return <TasksPage 
                  tasks={filteredTasks} 
                  onDeleteTask={handleDeleteTask} 
                  onEditTask={handleEditTaskClick}
                  onAddTaskClick={() => setIsCreateTaskModalOpen(true)}
                  taskFilter={taskFilter}
                  setTaskFilter={setTaskFilter}
                />;
      case 'Analytics':
        return <AnalyticsPage projects={projects} tasks={tasks} users={users} />;
      case 'History':
        return <HistoryPage history={history} />;
      case 'Settings':
        return <SettingsPage
            settings={userSettings}
            teamMembers={users}
            onUpdateSettings={handleUpdateSettings}
            onAddMember={handleAddTeamMember}
            onRemoveMember={handleRemoveTeamMember}
          />;
      default:
        return <div className="p-6"><h1 className="text-2xl font-bold">Page: {activePage}</h1><p>This is a dynamically generated page.</p></div>;
    }
  };

  if (!isInitialized) {
      return (
          <div className="flex items-center justify-center h-screen bg-light">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-dark-text"></div>
          </div>
      );
  }

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <>
    <div className="flex h-screen bg-light text-dark-text antialiased">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
        navItems={navItems}
        onAddSection={handleAddSection}
        user={currentUser!}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onSearchChange={setSearchTerm} 
          onMenuClick={() => setIsSidebarOpen(true)}
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
          isMessagesOpen={isMessagesOpen}
          setIsMessagesOpen={setIsMessagesOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light">
          {renderPage()}
        </main>
      </div>
    </div>
    <CreateTaskModal 
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onAddTask={handleAddTask}
        users={ALL_USERS}
    />
    <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={() => setIsEditTaskModalOpen(false)}
        onUpdateTask={handleUpdateTask}
        taskToEdit={editingTask}
        users={ALL_USERS}
    />
    </>
  );
}