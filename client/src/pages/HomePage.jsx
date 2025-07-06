import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import CourseCard from '../components/CourseCard.jsx';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/api/courses');
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="container">
      <h1>All Courses</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;