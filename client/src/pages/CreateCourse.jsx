import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'
import { useAuth } from '../context/AuthContext'

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'programming',
        price: '',
        duration: '',
        level: 'beginner'
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const { createCourse, error, clearError } = useCourse()
    const { user } = useAuth()
    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Course title is required'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Course description is required'
        }

        if (formData.price && isNaN(formData.price)) {
            newErrors.price = 'Price must be a valid number'
        }

        if (formData.duration && isNaN(formData.duration)) {
            newErrors.duration = 'Duration must be a valid number'
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

        const courseData = {
            ...formData,
            price: formData.price ? parseFloat(formData.price) : 0,
            duration: formData.duration ? parseInt(formData.duration) : 0,
            instructor: user._id
        }

        const result = await createCourse(courseData)
        setIsLoading(false)

        if (result.success) {
            navigate('/dashboard')
        }
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card">
                <h1>Create New Course</h1>
                <p>Share your knowledge by creating a new course</p>

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
                        <label>Course Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        {errors.title && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.title}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                        {errors.description && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.description}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="programming">Programming</option>
                            <option value="design">Design</option>
                            <option value="business">Business</option>
                            <option value="marketing">Marketing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                        />
                        {errors.price && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.price}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Duration (weeks)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="1"
                        />
                        {errors.duration && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.duration}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Level</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create Course'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/dashboard')}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCourse 