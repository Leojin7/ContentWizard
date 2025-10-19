import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TASK_ANALYTICS_DATA } from '../../constants';
import { MoreHorizontalIcon } from '../icons/Icons';
import Card from '../ui/Card';

interface TaskAnalyticsChartProps {
  title: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
        <p className="label font-bold text-gray-800">{`${label}`}</p>
        <p className="text-sm text-indigo-500">{`Created: ${payload[0].value}`}</p>
        <p className="text-sm text-green-500">{`Completed: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

const TaskAnalyticsChart: React.FC<TaskAnalyticsChartProps> = ({ title }) => {
  return (
    <Card>
       <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <button className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100" onClick={() => alert('Chart options clicked!')}>
            <MoreHorizontalIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={TASK_ANALYTICS_DATA} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
            <Bar dataKey="created" fill="#818cf8" name="Created" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" fill="#4ade80" name="Completed" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TaskAnalyticsChart;