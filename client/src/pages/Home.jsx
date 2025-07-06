import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'

const Home = () => {
    const { courses, fetchCourses, loading } = useCourse()

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    // Show up to 3 featured courses
    const featuredCourses = courses.slice(0, 3)

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)',
                color: 'white',
                padding: '60px 0',
                borderRadius: '10px',
                marginBottom: '40px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: '18px' }}>
                        Unlock Your Potential with EduLMS
                    </h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: 600, margin: '0 auto 30px', color: 'rgba(255,255,255,0.95)' }}>
                        Learn new skills, advance your career, and join a vibrant community of learners and instructors. Discover top courses in programming, design, business, and more.
                    </p>
                    <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', marginTop: 24 }}>
                        <Link to="/courses" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '12px 32px' }}>Browse Courses</Link>
                        <Link to="/register" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '12px 32px' }}>Get Started</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container" style={{ marginBottom: 40 }}>
                <div className="grid grid-3">
                    <div className="card" style={{ minHeight: 180 }}>
                        <h3 style={{ color: '#007bff', marginBottom: 10 }}>Expert Instructors</h3>
                        <p>Learn from industry professionals and passionate educators with real-world experience.</p>
                    </div>
                    <div className="card" style={{ minHeight: 180 }}>
                        <h3 style={{ color: '#007bff', marginBottom: 10 }}>Flexible Learning</h3>
                        <p>Access courses anytime, anywhere, and learn at your own pace with lifetime access to materials.</p>
                    </div>
                    <div className="card" style={{ minHeight: 180 }}>
                        <h3 style={{ color: '#007bff', marginBottom: 10 }}>Career Growth</h3>
                        <p>Gain practical skills, earn certificates, and boost your career opportunities in today's job market.</p>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="container">
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                        <h2 style={{ margin: 0 }}>Featured Courses</h2>
                        <Link to="/courses" className="btn btn-secondary">View All</Link>
                    </div>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '30px 0' }}>Loading courses...</div>
                    ) : featuredCourses.length > 0 ? (
                        <div className="grid grid-3">
                            {featuredCourses.map(course => (
                                <div key={course._id} className="card" style={{ border: '1px solid #f0f0f0', minHeight: 220 }}>
                                    <h4 style={{ color: '#0056b3', marginBottom: 8 }}>{course.title}</h4>
                                    <p style={{ color: '#444', minHeight: 48 }}>{course.description?.slice(0, 70) || 'No description.'}</p>
                                    <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                                        <span><strong>Instructor:</strong> {course.instructor?.name || 'Unknown'}</span>
                                    </div>
                                    <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                                        <span><strong>Category:</strong> {course.category || 'General'}</span>
                                    </div>
                                    <div style={{ fontWeight: 600, color: '#007bff', marginBottom: 12 }}>
                                        ${course.price || 0}
                                    </div>
                                    <Link to={`/courses/${course._id}`} className="btn btn-primary" style={{ width: '100%' }}>View Course</Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#888', padding: '20px 0' }}>
                            No courses available yet.
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Home 