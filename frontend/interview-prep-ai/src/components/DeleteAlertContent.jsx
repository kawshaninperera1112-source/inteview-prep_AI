import React from 'react'

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-2">
      {/* අනතුරු ඇඟවීමේ පණිවිඩය */}
      <p className="text-gray-300 text-sm leading-relaxed mb-6">
        {content || "Are you sure you want to delete this? This action cannot be undone."}
      </p>

      {/* Button එක සහිත කොටස */}
      <div className="flex justify-end gap-3">
        <button 
          type="button"
          className="px-5 py-2 text-sm font-semibold text-white bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all duration-300 active:scale-95"
          onClick={onDelete}
        >
          Confirm Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlertContent