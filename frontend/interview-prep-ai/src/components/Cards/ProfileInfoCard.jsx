import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.clear() වෙනුවට අදාළ key එක විතරක් ඉවත් කිරීම වඩාත් සුදුසුයි
    localStorage.removeItem("token"); 
    clearUser();
    navigate("/");
  };

  // User නැත්නම් මුකුත් පෙන්වන්න එපා
  if (!user) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/80 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300">
      
      {/* Avatar Section */}
      <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-500/50 shadow-lg shadow-purple-500/10">
        <img
          src={user?.profileImageUrl || "/default-avatar.png"}
          alt="Profile"
          className="w-full h-full object-cover"
          // UI-Avatars පාවිච්චි කරලා image error handle කිරීම ඉතාම හොඳයි
          onError={(e) => {
            e.currentTarget.onerror = null; 
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6366f1&color=fff`;
          }}
        />
      </div>

      {/* Name Section - මුල් නම පමණක් පෙන්වීම */}
      <span className="text-sm font-medium text-white/90 hidden sm:block">
        {user?.name?.split(" ")[0]}
      </span>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="text-[10px] uppercase tracking-wider font-bold text-purple-400 hover:text-white bg-purple-500/10 hover:bg-purple-600 px-3 py-1 rounded-full transition-all cursor-pointer border border-purple-500/20 active:scale-95"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfoCard;