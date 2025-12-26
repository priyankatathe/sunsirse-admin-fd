import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdPeopleAlt } from "react-icons/md";
import { RiProgress7Line, RiGraduationCapFill } from "react-icons/ri";
import { GrDocumentVerified } from "react-icons/gr";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { GrUserWorker } from "react-icons/gr";
import { PiStudentBold } from "react-icons/pi";
import { LuHeater } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { TbMoneybag } from "react-icons/tb";

const menuItems = [
    { name: "Dashboard", path: "/", icon: <MdDashboard />, active: true },
    { name: "Total User", path: "/total-user", icon: <MdPeopleAlt />, active: true },
    { name: "Product", path: "/product", icon: <LuHeater />, active: true },
    { name: "Order Management", path: "/order-management", icon: <FaShoppingCart />, active: true },
    { name: "Categories", path: "/categories", icon: <BiCategory />, active: true },
    { name: "Transactions", path: "/transactions", icon: <TbMoneybag />, active: true },

];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => setCollapsed(!collapsed);

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed md:relative inset-y-0 rounded-tr-3xl rounded-br-3xl left-0 bg-[#191A1A] text-white h-screen
  p-4 shadow-xl transform transition-all duration-300 z-40
  ${collapsed ? "w-28" : "w-64"}
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
  `}
            >

                {/* Logo */}
                <div className="flex items-center justify-center mb-6 transition-all duration-300">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className={`transition-all duration-300 object-contain ${collapsed ? "h-10" : "h-14"}`}
                    />
                </div>
                <hr className="border-t border-gray-700/90 my-6 w-full" />
                {/* Menu Items */}
                <nav className="mt-10 flex flex-col gap-5 ">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 rounded-xl px-6 py-2 transition-all duration-200
                ${isActive ? "bg-white text-[#1C58F2]" : "hover:bg-white hover:text-black"}`}
                            >
                                <span className="text-3xl ">{item.icon}</span>
                                {!collapsed && <span className="text-[20px] font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Collapse/Expand Arrow */}

            <div
                className={`
    fixed top-16 -ml-3 bg-[#F3AF1C] p-1 rounded-full cursor-pointer
    z-50 transition-all duration-300
    ${isOpen ? "block" : "hidden"} md:block
  `}
                style={{ left: collapsed ? "7rem" : "16rem" }}
                onClick={toggleCollapse}
            >

                {collapsed ? <IoIosArrowForward size={20} /> : <IoIosArrowBack size={20} />}
            </div>



            {/* Mobile overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black opacity-10 md:hidden" onClick={toggleSidebar}></div>
            )}
        </>
    );
};

export default Sidebar;