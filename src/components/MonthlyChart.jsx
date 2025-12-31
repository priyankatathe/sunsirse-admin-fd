// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Cell,
// } from 'recharts';
// import { useGetTransactionQuery } from '../redux/api/orderApi';

// const data = [
//   { name: 'Jan', light: 300, dark: 190 },
//   { name: 'Feb', light: 360, dark: 230 },
//   { name: 'Mar', light: 410, dark: 260 },
//   { name: 'Apr', light: 470, dark: 300 },
//   { name: 'May', light: 510, dark: 320 },
//   { name: 'Jun', light: 560, dark: 350 },
// ];

// const MonthlyRevenueChart = () => {
//   const {data} = useGetTransactionQuery()
//   return (
//     <div className="w-full max-w-10xl bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">Monthly Revenue</h2>

//       <div className="h-[400px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
//             barGap={8}
//           >
//             {/* Image ki tarah dashed grid lines */}
//             <CartesianGrid 
//               strokeDasharray="4 4" 
//               vertical={true} 
//               horizontal={true} 
//               stroke="#E5E7EB" 
//             />

//             <XAxis 
//               dataKey="name" 
//               axisLine={false} 
//               tickLine={false} 
//               tick={{ fill: '#6B7280', fontSize: 14 }}
//               dy={10}
//             />

//             <YAxis 
//               axisLine={false} 
//               tickLine={false} 
//               tick={{ fill: '#6B7280', fontSize: 14 }}
//               domain={[0, 600]}
//               ticks={[0, 100, 200, 300, 400, 500, 600]}
//             />

//             {/* Light Gray Bar */}
//             <Bar 
//               dataKey="light" 
//               fill="#E5E7EB" 
//               radius={[10, 10, 0, 0]} 
//               barSize={35} 
//             />

//             {/* Black Bar */}
//             <Bar 
//               dataKey="dark" 
//               fill="#000000" 
//               radius={[10, 10, 0, 0]} 
//               barSize={35} 
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default MonthlyRevenueChart;
















import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useGetTransactionQuery } from '../redux/api/orderApi';

const data = [
  { name: 'Jan', light: 300, dark: 190 },
  { name: 'Feb', light: 360, dark: 230 },
  { name: 'Mar', light: 410, dark: 260 },
  { name: 'Apr', light: 470, dark: 300 },
  { name: 'May', light: 510, dark: 320 },
  { name: 'Jun', light: 560, dark: 350 },
];

const MonthlyRevenueChart = () => {
  const { data } = useGetTransactionQuery();

  const transactions = data?.data || [];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthlyData = monthNames.map((month, index) => {
    let total = 0;
    let paid = 0;

    transactions.forEach((item) => {
      const date = new Date(item.createdAt);
      if (date.getMonth() === index) {
        const amount = Number(item.amount || 0);
        total += amount;

        if (item.payment_status === 'paid') {
          paid += amount;
        }
      }
    });

    return {
      name: month,
      light: total,
      dark: paid,
    };
  });

  return (
    <div className="w-full max-w-10xl bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Monthly Revenue
      </h2>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Bar dataKey="light" fill="#E5E7EB" radius={[10, 10, 0, 0]} barSize={35} />
            <Bar dataKey="dark" fill="#000000" radius={[10, 10, 0, 0]} barSize={35} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default MonthlyRevenueChart;