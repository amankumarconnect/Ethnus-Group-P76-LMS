import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const { register, error, clearError, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard')
        }
        return () => clearError()
    }, [isAuthenticated, navigate, clearError])

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        const result = await register(formData.name, formData.email, formData.password, formData.role)
        setIsLoading(false)

        if (result.success) {
            navigate('/dashboard')
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="card">
                <h2 className="text-center mb-20">Register</h2>

                {error && (
                    <div style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '15px',
                        border: '1px solid #f5c6cb'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.name}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.password}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p className="text-center mt-20">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    )
}

export default Register 