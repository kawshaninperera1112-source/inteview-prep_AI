import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import Login from "./pages/Auth/Login"; 
import Signup from "./pages/Auth/Signup"; 
import UserProvider, { UserContext } from './context/UserContext'; // UserContext import කළා

// ✅ 1. Protected Route Component එකක් හඳුන්වා දීම
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  // Refresh වූ සැනින් දත්ත ලැබෙන තෙක් Loading Screen එකක් පෙන්වීම
  if (loading) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center text-white font-bold">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500 mr-3"></div>
        Loading...
      </div>
    );
  }

  // User නැත්නම් පමණක් Login වෙත යොමු කිරීම
  if (!user) {
    return <Navigate to="/LandingPage" replace />;
  }

  return children;
};

// ✅ 2. Auth Route Component (Login වී සිටී නම් නැවත Login/Signup පෙන්වන්නේ නැත)
const AuthRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; // හෝ Loading spinner එකක්

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppContent = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route - Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* ✅ Auth Routes - ලොග් වී සිටී නම් Dashboard එකට redirect වේ */}
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />

        {/* ✅ Protected Routes - ලොග් වී නැත්නම් Dashboard එකට යා නොහැක */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/interview-prep/:sessionId" 
          element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} 
        />

        {/* වැරදි path එකක් ගැහුවොත් landing page එකට යවන්න */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

const App = () => {
  return (
    <UserProvider>
      <AppContent />
      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  )
}

export default App;