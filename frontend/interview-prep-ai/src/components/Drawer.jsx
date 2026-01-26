import React from 'react'
import { LuX } from 'react-icons/lu'

const Drawer = ({
    isOpen,
    onClose,
    title,
    children
}) => {
  return (
    <div className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] p-6 overflow-y-auto transition-transform duration-300 ease-in-out bg-[#0a0a0a] w-full md:w-[450px] border-l border-purple-900/30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] 
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      tabIndex="-1"
      aria-labelledby='drawer-right-label'
    >
      {/* Header කොටස */}
      <div className="flex items-center justify-between mb-6 border-b border-purple-900/20 pb-4">
        <h5 
          id='drawer-right-label'
          className="text-xl font-bold text-purple-400 tracking-tight"
        >
          {title}
        </h5>
        
        <button 
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg bg-purple-900/20 text-purple-400 hover:bg-purple-900/40 hover:text-purple-300 transition-all border border-purple-500/10"
          aria-label="Close drawer"
        >
          <LuX size={20} />
        </button>
      </div>

      {/* Content කොටස */}
      <div className="text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export default Drawer