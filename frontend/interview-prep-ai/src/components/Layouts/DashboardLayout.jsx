import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from "./Navbar";
import { Navigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    // 1. Loading state එකක් තියෙනවා නම් (Auth check කරන අතරතුර)
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // 2. User ලොග් වෙලා නැත්නම් Login එකට යවන්න
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;