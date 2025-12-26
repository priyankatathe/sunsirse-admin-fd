import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Heater', value: 55 },
  { name: 'Geysers', value: 25 },
  { name: 'Other', value: 20 },
];

const COLORS = ['#000000', '#E5E7EB', '#CCCCCC'];

const SaleByChat = () => {

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value, name }) => {
    if (name === 'Other') return null;

    const radius = outerRadius * 1.15;
    const x = cx + Math.abs(radius * Math.cos(-midAngle * Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="start"
        dominantBaseline="central"
        className="text-xs sm:text-sm md:text-base font-medium"
      >
        {`${name} ${value}%`}
      </text>
    );
  };

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
      
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 w-full text-left">
        Sales By Category
      </h2>

      {/* Responsive Height */}
      <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] max-w-md">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"   
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaleByChat;
