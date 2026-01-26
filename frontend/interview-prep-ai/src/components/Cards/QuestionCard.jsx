import React, { useRef, useState, useEffect } from 'react';
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu';
import AIResponsePriview from '../../pages/InterviewPrep/Components/AIResponsePriview';
const QuestionCard = ({
    question,
    answer,
    onLearnMore,
    isPinned,
    onTogglePin,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

   
    useEffect(() => {
        if (isExpanded && contentRef.current) {
           
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isExpanded, answer]); 

    const toggleExpand = (e) => {
        
        if (e.target.closest('button')) return;
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`group mb-4 transition-all duration-500 rounded-3xl border shadow-lg overflow-hidden ${
            isPinned 
            ? "bg-purple-900/10 border-purple-500/40 shadow-purple-500/5" 
            : "bg-zinc-900/40 border-white/5 hover:border-white/10"
        }`}>
            {/* Header Row */}
            <div 
                className="p-5 flex items-start justify-between gap-4 cursor-pointer"
                onClick={toggleExpand}
            >
                <div className="flex gap-4 flex-1">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border transition-colors ${
                        isPinned ? "bg-purple-500 text-white border-purple-400" : "bg-zinc-800 text-zinc-400 border-white/5"
                    }`}>
                        Q
                    </span>
                    
                    <h3 className={`font-medium text-lg leading-snug transition-colors ${
                        isExpanded ? "text-purple-300" : "text-white"
                    }`}>
                        {question}
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 transition-all duration-300 ${
                        isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0"
                    }`}>
                        <button 
                            title={isPinned ? "Unpin" : "Pin"}
                            className={`p-2 rounded-xl border transition-all active:scale-90 ${
                                isPinned ? "bg-purple-500/20 border-purple-500/30 text-purple-400" : "bg-zinc-800 border-white/5 text-zinc-500 hover:text-white cursor-pointer"
                            }`}
                            onClick={(e) => { e.stopPropagation(); onTogglePin(); }}>
                            {isPinned ? <LuPinOff size={18}/> : <LuPin size={18}/>}
                        </button>

                        <button 
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                            onClick={(e) => { 
                                e.stopPropagation();
                                setIsExpanded(true);
                                onLearnMore();
                            }}>
                            <LuSparkles size={14}/>
                            <span className="hidden sm:inline cursor-pointer">Learn More</span>
                        </button>
                    </div>

                    <button className="p-2 text-zinc-500 hover:text-white">
                        <LuChevronDown
                            size={22}
                            className={`transform transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Answer Content Wrapper */}
            <div 
                className="transition-all duration-500 ease-in-out bg-white/[0.02]"
                style={{ height: `${height}px` }}>
                <div ref={contentRef} className="p-6 pt-2 border-t border-white/5">
                    <div className="flex gap-4">
                         <span className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            A
                        </span>
                        <div className="text-slate-400 leading-relaxed text-base">
    <AIResponsePriview content=
                            {answer}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;