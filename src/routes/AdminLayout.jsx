import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex h-screen bg-[#FFFFF8] overflow-x-hidden">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            {/* Main Content */}
            <div
                className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"
                    }`}
            >
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-4 bg-[#FFFFF8] flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout