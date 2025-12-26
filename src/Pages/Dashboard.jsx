import React from "react";
import {
  Users,
  Package,
  Banknote,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import MonthlyRevenueChart from "../components/MonthlyChart";
import SaleByChat from "../components/SaleByChat";



const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold  text-gray-900">{value}</h3>
      </div>
      <div className="bg-neutral-900 p-3 rounded-xl">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-5 text-emerald-600 font-semibold text-sm">
      <TrendingUp className="w-4 h-4" />
      <span>+{trend}%</span>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "2,125", icon: Users, trend: "12.5" },
    { title: "Total Products", value: "156", icon: Package, trend: "12.5" },
    { title: "Revenue", value: "₹40.8K", icon: Banknote, trend: "12.5" },
    { title: "Total Orders", value: "25", icon: ShoppingCart, trend: "12.5" },
  ];

  return (
    <div className="px-4 font-manrope ">
      {/* <h2 className="text-3xl font-bold text-black mb-2">
       Dashboard
      </h2> */}
      <h2 className="text-lg font-semibold text-[#212121BD] mb-6">
        Overview of your Ecommerce website
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="">  
          <MonthlyRevenueChart />
        </div>

        <div className="">
          <SaleByChat />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
