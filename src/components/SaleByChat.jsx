// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { useGetCategoriesQuery } from '../redux/api/categoriesApi';

// const data = [
//   { name: 'Heater', value: 55 },
//   { name: 'Geysers', value: 25 },
//   { name: 'Other', value: 20 },
// ];

// const COLORS = ['#000000', '#E5E7EB', '#CCCCCC'];

// const SaleByChat = () => {

//   const {data} = useGetCategoriesQuery()

//   const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value, name }) => {
//     if (name === 'Other') return null;

//     const radius = outerRadius * 1.15;
//     const x = cx + Math.abs(radius * Math.cos(-midAngle * Math.PI / 180));
//     const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="black"
//         textAnchor="start"
//         dominantBaseline="central"
//         className="text-xs sm:text-sm md:text-base font-medium"
//       >
//         {`${name} ${value}%`}
//       </text>
//     );
//   };

//   return (
//     <div className="w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
      
//       <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 w-full text-left">
//         Sales By Category
//       </h2>

//       {/* Responsive Height */}
//       <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] max-w-md">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={renderCustomizedLabel}
//               outerRadius="80%"   
//               dataKey="value"
//             >
//               {data.map((_, index) => (
//                 <Cell key={index} fill={COLORS[index]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default SaleByChat;



import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useGetCategoriesQuery } from '../redux/api/categoriesApi';

const COLORS = ['#000000', '#E5E7EB', '#CCCCCC'];

const SaleByChat = () => {
  const { data } = useGetCategoriesQuery();

  const categories = data?.data || [];

  // 🔥 STEP 1: Normalize & merge categories
  const categoryMap = {};

  categories.forEach((cat) => {
    const key = cat.name.toLowerCase().replace(/s$/, ''); // geysers -> geyser

    if (!categoryMap[key]) {
      categoryMap[key] = {
        name: cat.name,
        count: 1,
      };
    } else {
      categoryMap[key].count += 1;
    }
  });

  const mergedCategories = Object.values(categoryMap);

  // 🔥 STEP 2: Total category count
  const totalCount = mergedCategories.reduce(
    (sum, cat) => sum + cat.count,
    0
  );

  // 🔥 STEP 3: Convert to pie chart data with REAL %
  const pieData = mergedCategories.map((cat) => ({
    name: cat.name,
    value: Math.round((cat.count / totalCount) * 100),
  }));

  // 🔥 STEP 4: Add "Other" only if needed
  const used = pieData.reduce((sum, item) => sum + item.value, 0);

  if (used < 100) {
    pieData.push({
      name: 'Other',
      value: 100 - used,
    });
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
    name,
  }) => {
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

      <div className="w-full h-[380px] sm:h-[350px] md:h-[400px] ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaleByChat;
