import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // <-- ADD THIS NEW STATE
  const navigate = useNavigate();

  useEffect(() => {
    try {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
    } catch (error) {
        // If localStorage is corrupt, clear it
        console.error("Failed to parse user info from localStorage", error);
        localStorage.removeItem('userInfo');
    } finally {
        setLoading(false); // <-- SET LOADING TO FALSE AFTER CHECKING
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUserInfo(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  // Pass the loading state in the value
  return (
    <AuthContext.Provider value={{ userInfo, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;