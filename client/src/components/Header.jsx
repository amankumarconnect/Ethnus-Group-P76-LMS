import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { userInfo, logout } = useAuth();
  return (
    <header className="header">
      <Link to="/" className="header-logo">LMS Platform</Link>
      <nav>
        <Link to="/">Courses</Link>
        {userInfo ? (
          <>
            <Link to="/my-courses">My Courses</Link>
            {userInfo.role === 'instructor' && (
              <>
                <Link to="/create-course">Create Course</Link>
                <Link to="/dashboard">Dashboard</Link>
              </>
            )}
            <span>Welcome, {userInfo.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;