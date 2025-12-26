import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Heater', value: 55, labelPosition: 'outside' }, // 55%
  { name: 'Geysers', value: 25, labelPosition: 'outside' }, // 25%
  { name: 'Other', value: 20, labelPosition: 'hidden' },   // Remaining 20% to make it 100%
];

const COLORS = ['#000000', '#E5E7EB', '#CCCCCC']; // Black, Light Gray, Default Gray for 'Other'

const SaleByChat = () => {
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value, name }) => {
  if (name === 'Other') return null;

  const radius = outerRadius * 1.2; // distance from center
  const x = cx + Math.abs(radius * Math.cos(-midAngle * Math.PI / 180)); // always right
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor="start"  // force right side
      dominantBaseline="central"
      className="text-sm sm:text-base font-medium"
    >
      {`${name} ${value}%`}
    </text>
  );
};


  return (
    <div className="w-full max-w-10xl bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col  items-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 w-full text-left">Sales By Category</h2>

      <div className="h-[400px] m-2 w-full max-w-md"> {/* Fixed height, responsive width */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={160} // Size of the pie chart
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Optional: Add a legend if the "Other" category is visible or required */}
      {/* <div className="mt-4 w-full flex justify-center gap-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <span style={{ backgroundColor: COLORS[index] }} className="w-4 h-4 rounded-full"></span>
            <span className="text-gray-700 text-sm">{entry.name} {entry.value}%</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SaleByChat;