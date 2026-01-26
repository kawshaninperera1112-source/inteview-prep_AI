import React from 'react';
import moment from 'moment';
import { LuBriefcase, LuClock, LuLayers } from "react-icons/lu";

const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience,
    questionsCount,
    description,
    lastUpdated,
}) => {
    return (
        <div className="bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-white/5 rounded-[2rem] p-8 mb-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                
                {/* Role and Tech Stack */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                            <LuBriefcase size={20} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight capitalize">
                            {role} <span className="text-purple-500 font-medium">Prep</span>
                        </h2>
                    </div>
                    
                    {/* Tech Stack Chips - Mehema dammahma lassanai */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        <span className="bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded text-[10px] font-bold tracking-tighter border border-white/5 mr-1">
                            STACK
                        </span>
                        {topicsToFocus ? (
                            topicsToFocus.split(',').map((tech, index) => (
                                <span key={index} className="bg-purple-500/5 text-purple-400/80 px-3 py-1 rounded-full text-[11px] font-medium border border-purple-500/10">
                                    {tech.trim()}
                                </span>
                            ))
                        ) : (
                            <p className="text-slate-500 text-sm">General Topics</p>
                        )}
                    </div>
                </div>

                {/* Stats Chips */}
                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <StatChip 
                        label="Experience" 
                        value={`${experience} ${experience === 1 ? "Year" : "Years"}`} 
                    />
                    <StatChip 
                        label="Questions" 
                        value={`${questionsCount || 0} Q&A`} 
                    />
                    <StatChip 
                        label="Last Updated" 
                        /* ✅ FIXED: Multiple formats add karala parse karana nisa ara warning eka enne na */
                        value={lastUpdated ? moment(lastUpdated, ["YYYY-MM-DD", "Do MMM YYYY", moment.ISO_8601]).format("Do MMM YYYY") : "N/A"} 
                    />
                </div>
            </div>

            {/* Description / Notes Section */}
            {description && (
                <div className="mt-8 pt-6 border-t border-white/5 group">
                    <div className="flex items-center gap-2 mb-3">
                        <LuLayers className="text-purple-500/50 group-hover:text-purple-500 transition-colors" size={14} />
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">Session Insights</p>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-4xl">
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
};

// Reusable Stat Chip for cleaner code
const StatChip = ({ label, value }) => (
    <div className="flex-1 lg:flex-none min-w-[130px] bg-zinc-900/50 border border-white/5 px-5 py-3 rounded-2xl hover:border-purple-500/30 transition-all duration-300 group">
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 group-hover:text-purple-400 transition-colors">
            {label}
        </p>
        <p className="text-white font-bold text-sm tracking-tight">{value}</p>
    </div>
);

export default RoleInfoHeader;