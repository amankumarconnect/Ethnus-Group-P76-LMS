import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'

const Courses = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const { courses, fetchCourses, loading, error } = useCourse()

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <div>Loading courses...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="card">
                <div style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '15px',
                    borderRadius: '4px',
                    border: '1px solid #f5c6cb'
                }}>
                    Error: {error}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="card">
                <h1>All Courses</h1>
                <p>Discover courses from expert instructors</p>

                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                </div>
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid grid-3">
                    {filteredCourses.map(course => (
                        <div key={course._id} className="card">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <p><strong>Instructor:</strong> {course.instructor?.name || 'Unknown'}</p>
                            <p><strong>Price:</strong> ${course.price || 0}</p>
                            <p><strong>Lessons:</strong> {course.lessons?.length || 0}</p>
                            <p><strong>Students:</strong> {course.students?.length || 0}</p>
                            <p><strong>Category:</strong> {course.category || 'General'}</p>
                            <Link to={`/courses/${course._id}`} className="btn btn-primary">
                                View Course
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card text-center">
                    <p>No courses found matching your search.</p>
                </div>
            )}
        </div>
    )
}

export default Courses 