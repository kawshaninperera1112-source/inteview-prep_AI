import React from 'react';
import { LuTrash2, LuCalendar, LuBriefcase, LuMessageSquare } from "react-icons/lu";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  
  const bgColor = colors?.bgcolor || '#8b5cf6';
  const textColor = colors?.textColor || '#fff';

  return (
    <div 
      className="group relative bg-zinc-900/40 border border-white/5 rounded-3xl p-5 hover:border-purple-500/50 hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer shadow-xl overflow-hidden active:scale-[0.98]"
      onClick={onSelect}
    >
      {/* Glow Effect */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
        style={{ background: bgColor }}
      />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-inner transition-transform group-hover:scale-110 duration-300"
            style={{ 
                background: `${bgColor}20`, 
                color: textColor,
                border: `1px solid ${bgColor}40`
            }}
          >
            {role?.charAt(0) || "I"}
          </div>

          <button 
            title="Delete Session"
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors z-20"
            onClick={(e) => {
              e.stopPropagation();
              // ✅ Browser Alert එක ඉවත් කර කෙලින්ම Dashboard හි ඇති Modal එක trigger කිරීම
              onDelete(); 
            }}
          >
            <LuTrash2 size={18} />
          </button>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors tracking-tight line-clamp-1">
            {role}
          </h2>
          <p className="text-[10px] font-bold text-purple-500/80 uppercase tracking-[0.15em] mt-1">
            {topicsToFocus}
          </p>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 italic group-hover:text-slate-300 transition-colors min-h-[40px]">
          {description ? `"${description}"` : "No specific description provided."}
        </p>

        <div className="h-[1px] w-full bg-white/5 my-1" />

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-white/5 p-2 rounded-xl border border-white/[0.02]">
            <LuBriefcase className="text-purple-500" size={14} />
            <span>Exp: {experience} {experience === 1 ? "Yr" : "Yrs"}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-white/5 p-2 rounded-xl border border-white/[0.02]">
            <LuMessageSquare className="text-purple-500" size={14} />
            <span>{questions || 0} Questions</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <LuCalendar className="text-slate-600" size={12} />
          <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
            Last Prep: {lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;