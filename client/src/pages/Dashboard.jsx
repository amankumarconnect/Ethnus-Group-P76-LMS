import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCourse } from '../context/CourseContext'

const Dashboard = () => {
    const { user } = useAuth()
    const { courses, fetchCourses, loading } = useCourse()

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <div>Loading dashboard...</div>
            </div>
        )
    }

    const userCourses = user?.role === 'instructor'
        ? courses.filter(course => course.instructor === user._id)
        : courses.filter(course => course.students?.includes(user?._id))

    return (
        <div>
            <div className="card">
                <h1>Dashboard</h1>
                <p>Welcome back, {user?.name}!</p>
            </div>

            {user?.role === 'student' ? (
                <div className="grid grid-2">
                    <div className="card">
                        <h3>My Courses</h3>
                        {userCourses.length > 0 ? (
                            <>
                                <p>You are enrolled in {userCourses.length} course(s)</p>
                                <ul>
                                    {userCourses.map(course => (
                                        <li key={course._id}>{course.title}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>You are not enrolled in any courses yet.</p>
                        )}
                        <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                    </div>

                    <div className="card">
                        <h3>Progress</h3>
                        <p>Overall Progress: 65%</p>
                        <div style={{
                            width: '100%',
                            backgroundColor: '#ddd',
                            borderRadius: '4px',
                            margin: '10px 0'
                        }}>
                            <div style={{
                                width: '65%',
                                backgroundColor: '#007bff',
                                height: '20px',
                                borderRadius: '4px'
                            }}></div>
                        </div>
                        <p>Completed Lessons: 13/20</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-2">
                    <div className="card">
                        <h3>My Courses</h3>
                        {userCourses.length > 0 ? (
                            <>
                                <p>You have created {userCourses.length} course(s)</p>
                                <ul>
                                    {userCourses.map(course => (
                                        <li key={course._id}>{course.title}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>You haven't created any courses yet.</p>
                        )}
                        <Link to="/create-course" className="btn btn-primary">Create New Course</Link>
                    </div>

                    <div className="card">
                        <h3>Statistics</h3>
                        <p>Total Students: {courses.reduce((total, course) => total + (course.students?.length || 0), 0)}</p>
                        <p>Total Revenue: $1,250</p>
                        <p>Average Rating: 4.2/5</p>
                    </div>
                </div>
            )}

            <div className="card">
                <h3>Recent Activity</h3>
                <div style={{ borderLeft: '3px solid #007bff', paddingLeft: '15px' }}>
                    <p><strong>2 hours ago:</strong> Completed lesson "Introduction to Variables"</p>
                    <p><strong>1 day ago:</strong> Enrolled in "Python Programming" course</p>
                    <p><strong>3 days ago:</strong> Started "Web Development" course</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard 