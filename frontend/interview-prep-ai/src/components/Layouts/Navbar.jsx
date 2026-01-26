import React from 'react';
import ProfileInfo from "../Cards/ProfileInfoCard";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo Section */}
                    <Link to="/landingPage" className="flex items-center gap-2.5 group">
                        {/* AI Box Icon */}
                        <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <span className="text-white font-black text-sm italic">AI</span>
                        </div>
                        
                        {/* Brand Name - Hidden on very small screens */}
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold leading-none text-white tracking-tight">
                                Interview<span className="text-purple-500">Prep</span>
                            </h2>
                            <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">Intelligence</span>
                        </div>
                    </Link>

                    {/* Right Side - Actions & Profile */}
                    <div className="flex items-center gap-2 sm:gap-6">
                        {/* උදාහරණයක් විදිහට තව Link එකක් එකතු කළොත් */}
                        <NavLink 
                            to="/dashboard" 
                            className={({ isActive }) => 
                                `text-xs font-bold uppercase tracking-wider transition-colors hidden md:block ${
                                    isActive ? "text-purple-400" : "text-zinc-500 hover:text-white"
                                }`
                            }
                        >
                            History
                        </NavLink>

                        <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

                        <ProfileInfo />
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;