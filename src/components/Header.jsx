import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { FaSearch, FaBell, FaUser } from "react-icons/fa"
import { FcBusinessman } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // Path to Title Mapping
    const titles = {
        "/": "Dashboard",
        "/total-user": "Total Users",
        "/product": "Products",
        "/order-management": "Order Management",
        "/categories": "Categories",
        "/transactions": "Transactions",
        "/coupens": "Coupens",
        "/message": "Messages",
    };
    return (
        <header className="bg-[#FFFFF8]  p-4 flex items-center justify-between">
            {/* Sidebar Toggle Button (Mobile) */}
            <button onClick={toggleSidebar} className="text-gray-900 text-2xl md:hidden">
                <FaBars />
            </button>

            {/* Dynamic Page Title */}
            <h1 className="text-2xl  ml-5 font-bold">{titles[location.pathname] || "Admin Panel"}</h1>
        </header>
    );
};

export default Header;
