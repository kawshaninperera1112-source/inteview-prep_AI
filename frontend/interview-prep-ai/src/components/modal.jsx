import React, { useEffect } from 'react';
import { LuX } from 'react-icons/lu';

const Modal = ({ isOpen, onClose, children, title, hideHeader, maxWidth = "max-w-md" }) => {
  
  // Modal එක open වෙලා තියෙද්දී පිටුපස ඇති screen එක scroll වීම නතර කිරීමට
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* 1. Background Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose} // පිටත click කළ විට වැසීමට
      />
      
      {/* 2. Modal Container */}
      <div className={`bg-zinc-900 border border-white/10 rounded-[2rem] shadow-2xl w-full ${maxWidth} relative flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in duration-300`}>
        
        {/* Modal Header */}
        {!hideHeader && (
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            <button 
              onClick={onClose} 
              className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-all"
            >
              <LuX size={20} />
            </button>
          </div>
        )}

        {/* Close Button (Header එක නැති වෙලාවට පෙන්වීමට) */}
        {hideHeader && (
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 z-20 p-2 bg-black/20 hover:bg-black/40 text-slate-400 hover:text-white rounded-full transition-all"
          >
            <LuX size={20} />
          </button>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;