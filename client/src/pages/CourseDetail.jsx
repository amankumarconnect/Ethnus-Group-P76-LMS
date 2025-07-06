import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'
import { useAuth } from '../context/AuthContext'

const CourseDetail = () => {
    const { id } = useParams()
    const { currentCourse, fetchCourseById, loading, error } = useCourse()
    const { user, isAuthenticated } = useAuth()

    useEffect(() => {
        if (id) {
            fetchCourseById(id)
        }
    }, [id, fetchCourseById])

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <div>Loading course...</div>
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

    if (!currentCourse) {
        return (
            <div className="card text-center">
                <p>Course not found.</p>
            </div>
        )
    }

    return (
        <div>
            <div className="card">
                <h1>{currentCourse.title}</h1>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                    {currentCourse.description}
                </p>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span><strong>Instructor:</strong> {currentCourse.instructor?.name || 'Unknown'}</span>
                    <span><strong>Price:</strong> ${currentCourse.price || 0}</span>
                    <span><strong>Duration:</strong> {currentCourse.duration || 'Not specified'}</span>
                    <span><strong>Level:</strong> {currentCourse.level || 'Not specified'}</span>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span><strong>Lessons:</strong> {currentCourse.lessons?.length || 0}</span>
                    <span><strong>Students:</strong> {currentCourse.students?.length || 0}</span>
                    <span><strong>Category:</strong> {currentCourse.category || 'General'}</span>
                </div>

                {isAuthenticated ? (
                    <button className="btn btn-primary">Enroll Now</button>
                ) : (
                    <Link to="/login" className="btn btn-primary">Login to Enroll</Link>
                )}
            </div>

            <div className="grid grid-2">
                <div className="card">
                    <h3>Course Content</h3>
                    {currentCourse.lessons && currentCourse.lessons.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {currentCourse.lessons.map((lesson, index) => (
                                <li key={lesson._id || index} style={{
                                    padding: '10px 0',
                                    borderBottom: '1px solid #eee',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '25px',
                                        height: '25px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        marginRight: '10px'
                                    }}>
                                        {index + 1}
                                    </span>
                                    {lesson.title}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No lessons available yet.</p>
                    )}
                </div>

                <div className="card">
                    <h3>What you'll learn</h3>
                    <ul>
                        <li>Comprehensive understanding of the subject</li>
                        <li>Practical skills and hands-on experience</li>
                        <li>Real-world applications and examples</li>
                        <li>Best practices and industry standards</li>
                        <li>Problem-solving techniques</li>
                        <li>Project-based learning approach</li>
                    </ul>

                    <h3 style={{ marginTop: '20px' }}>Requirements</h3>
                    <ul>
                        <li>Basic computer skills</li>
                        <li>No prior experience required</li>
                        <li>A computer with internet connection</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <h3>About the Instructor</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#007bff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                        {currentCourse.instructor?.name ?
                            currentCourse.instructor.name.split(' ').map(n => n[0]).join('') :
                            'I'
                        }
                    </div>
                    <div>
                        <h4>{currentCourse.instructor?.name || 'Instructor'}</h4>
                        <p>Experienced instructor with expertise in this field. Passionate about helping students learn and grow.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail 