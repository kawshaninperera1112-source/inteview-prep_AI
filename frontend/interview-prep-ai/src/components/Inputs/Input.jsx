import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type, name }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full group">
            {/* Label - focus වෙද්දී පාට වෙනස් වන ලෙස සකසා ඇත */}
            <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1 transition-colors group-focus-within:text-purple-400">
                {label}
            </label>
            
            <div className="relative flex items-center">
                <input
                    name={name}
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
                />

                {/* Password Toggle Icon */}
                {type === "password" && (
                    <button
                        type="button" // Form submit වීම වැළැක්වීමට
                        onClick={toggleShowPassword}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-4 text-slate-500 hover:text-purple-400 transition-colors focus:outline-none"
                    >
                        {showPassword ? (
                            <FaRegEye size={18} />
                        ) : (
                            <FaRegEyeSlash size={18} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;