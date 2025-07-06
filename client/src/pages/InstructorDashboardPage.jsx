import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const InstructorDashboardPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const { data } = await api.get('/api/courses/instructor/my-courses');
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch instructor data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructorData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  const totalEarnings = courses.reduce((acc, course) => acc + course.price * course.students.length, 0);
  const totalStudents = courses.reduce((acc, course) => acc + course.students.length, 0);

  return (
    <div className="container">
      <h1>Instructor Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div className="course-card-body"><h3>Total Earnings: ${totalEarnings.toFixed(2)}</h3></div>
        <div className="course-card-body"><h3>Total Students: {totalStudents}</h3></div>
      </div>

      <h2>Your Courses</h2>
      {courses.map(course => (
        <div key={course._id} className="course-card" style={{ marginBottom: '2rem' }}>
          <div className="course-card-body">
            <h3><Link to={`/course/${course._id}`}>{course.title}</Link></h3>
            <p><strong>Price:</strong> ${course.price.toFixed(2)}</p>
            <p><strong>Students Enrolled:</strong> {course.students.length}</p>
            <h4>Enrolled Students:</h4>
            {course.students.length > 0 ? (
              <ul>
                {course.students.map(student => (
                  <li key={student._id}>{student.name} ({student.email})</li>
                ))}
              </ul>
            ) : (
              <p>No students have enrolled yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstructorDashboardPage;