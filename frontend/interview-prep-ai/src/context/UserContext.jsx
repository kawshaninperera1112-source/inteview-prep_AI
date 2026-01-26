import React, { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axioslnstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const clearUser = useCallback(() => {
        setUser(null);
        localStorage.removeItem("token");
    }, []);

    // UserProvider.jsx ඇතුළත මෙලෙස පරීක්ෂා කරන්න
const fetchUser = useCallback(async () => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
        setLoading(false);
        return;
    }

    try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      
        setUser(response.data.user || response.data); 
    } catch (error) {
        clearUser();
    } finally {
        setLoading(false);
    }
}, [clearUser]);
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;