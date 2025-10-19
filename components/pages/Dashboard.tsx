import React from 'react';
import ProjectStatsCard from '../dashboard/ProjectStatsCard';
import TeamMembersCard from '../dashboard/TeamMembersCard';
import TaskList from '../dashboard/TaskList';
import AnalyticsChart from '../dashboard/AnalyticsChart';
import AIWizardWidget from '../dashboard/AIWizardWidget';
import { Task, User, TaskStatus, Country, Project } from '../../types';

interface DashboardProps {
    tasks: Task[];
    users: User[];
    projects: Project[];
    onAddTask: (task: Partial<Omit<Task, 'id'>>) => void;
    onAddTaskClick: () => void;
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void;
    setActivePage: (page: string) => void;
    taskFilter: TaskStatus | 'All';
    setTaskFilter: (filter: TaskStatus | 'All') => void;
    selectedCountry: Country;
    onCountryChange: (country: Country) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, users, projects, onAddTask, onAddTaskClick, onDeleteTask, onEditTask, setActivePage, taskFilter, setTaskFilter, selectedCountry, onCountryChange }) => {
    
    const processFinancialData = (tasks: Task[], type: 'income' | 'expense') => {
        const months = Array.from({ length: 6 }, (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            return { name: d.toLocaleString('default', { month: 'short' }), month: d.getMonth(), year: d.getFullYear(), value: 0 };
        }).reverse();

        const relevantTasks = tasks.filter(task => {
            const taskDate = new Date(task.date.split(',')[0]);
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            sixMonthsAgo.setDate(1);
            sixMonthsAgo.setHours(0,0,0,0);
            
            if (isNaN(taskDate.getTime()) || taskDate < sixMonthsAgo) return false;

            if (type === 'income') {
                return task.status === TaskStatus.Received && task.amount > 0;
            } else { // expense
                return (task.status === TaskStatus.Payment || task.status === TaskStatus.Sent) && task.amount > 0;
            }
        });

        relevantTasks.forEach(task => {
            const taskDate = new Date(task.date.split(',')[0]);
            const monthIndex = months.findIndex(m => m.month === taskDate.getMonth() && m.year === taskDate.getFullYear());
            if (monthIndex > -1) {
                months[monthIndex].value += task.amount;
            }
        });
        
        months.forEach(m => m.value = parseFloat(m.value.toFixed(2)));

        const total = months.reduce((acc, month) => acc + month.value, 0);

        const lastMonthValue = months[months.length - 1]?.value || 0;
        const secondLastMonthValue = months[months.length - 2]?.value || 0;
        
        let change = 0;
        if (secondLastMonthValue > 0) {
            change = ((lastMonthValue - secondLastMonthValue) / secondLastMonthValue) * 100;
        } else if (lastMonthValue > 0) {
            change = 100;
        }
        
        // FIX: Explicitly typed `changeType` to ensure it is assignable to the 'positive' | 'negative' union type required by AnalyticsChart.
        const changeType: 'positive' | 'negative' = change >= 0 ? 'positive' : 'negative';
        const changeString = `${change >= 0 ? '+' : ''}${change.toFixed(0)}% vs Prev month`;

        return { data: months, total, change: changeString, changeType };
    };

    const { data: incomeData, total: totalIncome, change: incomeChange, changeType: incomeChangeType } = processFinancialData(tasks, 'income');
    const { data: expensesData, total: totalExpenses, change: expensesChange, changeType: expensesChangeType } = processFinancialData(tasks, 'expense');
    const highlightMonth = new Date().toLocaleString('default', { month: 'short' });

  return (
    <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <ProjectStatsCard 
                        projectCount={projects.length} 
                        selectedCountry={selectedCountry}
                        onCountryChange={onCountryChange}
                        onAssignClick={() => setActivePage('Projects')}
                        onRequestClick={onAddTaskClick}
                    />
                    <TeamMembersCard users={users} onManageClick={() => setActivePage('Settings')} />
                </div>
                <TaskList 
                    tasks={tasks.slice(0, 5)} 
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask} 
                    onAddTaskClick={onAddTaskClick}
                    onViewAll={() => setActivePage('Tasks')}
                    taskFilter={taskFilter}
                    setTaskFilter={setTaskFilter}
                    isPaginated={false}
                />
            </div>
            <div className="xl:col-span-4 space-y-6">
                <AnalyticsChart 
                    title="Total Expenses"
                    total={`$${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    change={expensesChange}
                    changeType={expensesChangeType}
                    data={expensesData}
                    dataKey="value"
                    barColor="#F1F1F1"
                    highlightColor="#1A1D1F"
                    highlightMonth={highlightMonth}
                />
                <AnalyticsChart 
                    title="Total Income"
                    total={`$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    change={incomeChange}
                    changeType={incomeChangeType}
                    data={incomeData}
                    dataKey="value"
                    barColor="#F1F1F1"
                    highlightColor="#1A1D1F"
                    highlightMonth={highlightMonth}
                />
                <AIWizardWidget onAddTask={onAddTask}/>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;