import React from "react";
import { Users, TrendingUp } from "lucide-react";
import MonthlyRevenueChart from "../components/MonthlyChart";
import SaleByChat from "../components/SaleByChat";
import { LuHeater } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { MdShoppingCart } from "react-icons/md";
import {
  useGetOrderQuery,
  useGetTransactionQuery,
} from "../redux/api/orderApi";
import { useGetProductsQuery } from "../redux/api/productApi";
import { useGetUsersQuery } from "../redux/api/userApi";

/* ================== STAT CARD ================== */
const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
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

/* ================== SKELETON ================== */
const StatSkeleton = () => {
  return [...Array(4)].map((_, i) => (
    <div
      key={i}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse"
    >
      <div className="flex justify-between mb-6">
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="h-4 w-20 bg-gray-200 rounded"></div>
    </div>
  ));
};

/* ================== DASHBOARD ================== */
const Dashboard = () => {
  const { data: orderData, isLoading: orderLoading } = useGetOrderQuery();
  const { data: productData, isLoading: productLoading } =
    useGetProductsQuery();
  const { data: transactionData, isLoading: transactionLoading } =
    useGetTransactionQuery();
  const { data: userData, isLoading: userLoading } = useGetUsersQuery();

  const isLoading =
    orderLoading || productLoading || transactionLoading || userLoading;

  /* ===== TOTALS ===== */
  const totalUsers = userData?.data?.length || 0;
  const totalProducts = productData?.products?.length || 0;
  const totalOrders = orderData?.data?.length || 0;
  const totalAmount =
    transactionData?.data?.reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    ) || 0;

  const paidAmount =
    transactionData?.data
      ?.filter((t) => t.payment_status === "paid")
      ?.reduce((sum, t) => sum + Number(t.amount || 0), 0) || 0;

 const revenuePercent =
  totalAmount > 0
    ? ((paidAmount / totalAmount) * 100).toFixed(1)
    : 0;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      trend: "12.5",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: LuHeater,
      trend: "12.5",
    },
    {
      title: "Revenue",
      value: `${revenuePercent}%`,
      icon: TbMoneybag,
      trend: "12.5",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: MdShoppingCart,
      trend: "12.5",
    },
  ];

  return (
    <div className="px-4 font-manrope">
      <h2 className="text-lg font-semibold text-[#212121BD] mb-6">
        Overview of your Ecommerce website
      </h2>

      {/* ================== STATS ================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? <StatSkeleton />
          : stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
      </div>

      {/* ================== CHARTS ================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <MonthlyRevenueChart />
        <SaleByChat />
      </div>
    </div>
  );
};

export default Dashboard;
