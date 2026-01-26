import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axioslnstance'; // Spelling mistake එකක් තිබුණා 'axioslnstance'
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import SpinnerLoader from '../../components/Loader/SpinnerLoader'; // කලින් හදපු loader එක

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state එකක් එකතු කළා
 
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validations
    if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
    }
    if (!password) {
        setError("Please enter the password.");
        return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        
        updateUser(user || response.data); 
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false); // Request එක ඉවර වුණාම loading නවත්වන්න
    }
  };

  return (
    <div className="w-full p-2 bg-zinc-900 text-white rounded-2xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h3>
        <p className="text-slate-400 mt-2 text-sm">
          Please enter your details to login
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <Input 
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input 
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-[11px] font-medium bg-red-400/10 border border-red-400/20 py-2.5 px-3 rounded-xl animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-purple-600 text-white py-3 mt-2 rounded-xl font-bold hover:bg-purple-700 transition-all active:scale-[0.98] shadow-lg shadow-purple-900/40 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerLoader size="w-5 h-5" color="text-white" /> : "LOGIN"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-400 font-medium">
          Don't have an account?{" "}
          <button
            onClick={() => setCurrentPage("signup")}
            className="text-purple-400 font-bold hover:text-purple-300 hover:underline cursor-pointer transition-colors ml-1"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;