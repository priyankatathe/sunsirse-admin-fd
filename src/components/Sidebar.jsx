
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdPeopleAlt } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { LuHeater } from "react-icons/lu";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { TbMoneybag } from "react-icons/tb";
import { HiTicket } from "react-icons/hi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLogoutAdminMutation } from "../redux/api/userApi";
import { toast } from "react-toastify";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <MdDashboard /> },
  { name: "Total User", path: "/total-user", icon: <MdPeopleAlt /> },
  { name: "Product", path: "/product", icon: <LuHeater /> },
  { name: "Order Management", path: "/order-management", icon: <FaShoppingCart /> },
  { name: "Categories", path: "/categories", icon: <BiCategory /> },
  { name: "Transactions", path: "/transactions", icon: <TbMoneybag /> },
  { name: "Coupens", path: "/coupens", icon: <HiTicket /> },
  { name: "Messages", path: "/message", icon: <RiMessage2Fill /> },
  { name: "Logout", icon: <FiLogOut /> },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const location = useLocation();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.admin);

  const [logoutAdmin] = useLogoutAdminMutation();

  const handleLogout = async () => {
  try {
    await logoutAdmin().unwrap(); 
    toast.success("Logout successful ");
  } catch (error) {
    console.error("Logout failed:", error);
    toast.success("Logout successful");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.clear(); 

    setTimeout(() => {
      navigate("/login-admin");
    }, 1000);
  }
};

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 bg-[#191A1A] text-white h-screen
        p-4 shadow-xl transform transition-all duration-300 z-40 flex flex-col
        rounded-tr-3xl rounded-br-3xl
        ${collapsed ? "w-28" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-6 transition-all duration-300">
          <img
            src="/logo.png"
            alt="logo"
            className={`transition-all duration-300 object-contain ${collapsed ? "h-10" : "h-14"
              }`}
          />
        </div>

        <hr className="border-t border-gray-700/90 my-4 w-full" />

        {/* Menu */}
        <nav className="flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            // ✅ LOGOUT BUTTON
            if (item.name === "Logout") {
              return (
                <button
                  key={item.name}
                  onClick={handleLogout}
                  className="flex items-center gap-4 rounded-xl px-4 py-2 transition-all duration-200
                  hover:bg-red-500 hover:text-white w-full text-left"
                >
                  <span className="text-2xl">{item.icon}</span>
                  {!collapsed && (
                    <span className="text-[15px] font-medium">Logout</span>
                  )}
                </button>
              );
            }

            // ✅ NORMAL LINKS
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 rounded-xl px-4 py-2 transition-all duration-200
                ${isActive
                    ? "bg-white text-black"
                    : "hover:bg-white hover:text-black"
                  }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {!collapsed && (
                  <span className="text-[15px] font-medium">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin Info */}
        <div className="mt-auto flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <FaUserAlt className="text-black text-lg" />
          </div>

          {!collapsed && (
            <div>
              <p className="text-sm font-medium">
                {admin?.admin?.email || "Admin"}
              </p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Arrow */}
      <div
        className={`fixed top-16 -ml-3 lg:mt-5 bg-[#F3AF1C] p-1 rounded-full cursor-pointer
        z-50 transition-all duration-300
        ${isOpen ? "block" : "hidden"} md:block`}
        style={{ left: collapsed ? "7rem" : "16rem" }}
        onClick={toggleCollapse}
      >
        {collapsed ? (
          <IoIosArrowForward size={20} />
        ) : (
          <IoIosArrowBack size={20} />
        )}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
