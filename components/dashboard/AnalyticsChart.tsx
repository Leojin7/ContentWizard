import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '../ui/Card';
import { ChartDataPoint } from '../../types';
import { MoreHorizontalIcon } from '../icons/Icons';

interface AnalyticsChartProps {
  title: string;
  total: string;
  change: string;
  changeType: 'positive' | 'negative';
  data: ChartDataPoint[];
  dataKey: string;
  barColor: string;
  highlightColor: string;
  highlightMonth: string;
}

const CustomTooltip = ({ active, payload, label, total }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark text-white p-2 rounded-lg shadow-lg text-xs">
          <p className="font-bold">{`$${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ title, total, change, changeType, data, dataKey, barColor, highlightColor, highlightMonth }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-dark-text">{title}</h3>
          <p className="text-2xl font-bold text-dark-text tracking-tighter">{total}</p>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`text-xs font-semibold ${changeType === 'positive' ? 'text-green-dark' : 'text-red-dark'}`}>{change}</span>
            <button className="text-gray-text hover:text-dark-text">
                <MoreHorizontalIcon className="w-5 h-5"/>
            </button>
        </div>
      </div>
      <div className="h-32 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
             <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)', radius: 8 }} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6F767E' }} dy={10} />
            <Bar dataKey={dataKey} radius={8}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === highlightMonth ? highlightColor : barColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AnalyticsChart;