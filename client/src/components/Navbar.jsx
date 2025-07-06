import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav style={{
            backgroundColor: '#333',
            padding: '15px 0',
            color: 'white'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>
                        EduLMS
                    </Link>

                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center'
                    }}>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                        <Link to="/courses" style={{ color: 'white', textDecoration: 'none' }}>Courses</Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                                {user?.role === 'instructor' && (
                                    <Link to="/create-course" style={{ color: 'white', textDecoration: 'none' }}>Create Course</Link>
                                )}
                                <span style={{ color: '#ccc' }}>Welcome, {user?.name}</span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: 'none',
                                        border: '1px solid white',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                                <Link to="/register" className="btn btn-primary">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar 