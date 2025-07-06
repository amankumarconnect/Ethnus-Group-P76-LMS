import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
import api from '../utils/api';
import CourseCard from '../components/CourseCard.jsx';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); // Get URL search params
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if the page was loaded from a successful payment
    if (searchParams.get('payment_success')) {
      setShowSuccess(true);
    }
    
    const fetchMyCourses = async () => {
      try {
        const { data } = await api.get('/api/users/my-courses');
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch my courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, [searchParams]);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="container">
      <h1>My Courses</h1>
      
      {showSuccess && (
        <div className="success-message" style={{ background: '#2a4d3e', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
          Payment successful! Welcome to your new course.
        </div>
      )}

      {courses.length > 0 ? (
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <p>You have not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default MyCoursesPage;