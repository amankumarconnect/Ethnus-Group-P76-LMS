import React from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api'; // To construct the image URL

const CourseCard = ({ course }) => {
  const imageUrl = `${api.defaults.baseURL}${course.thumbnail}`;

  return (
    <div className="course-card">
      <Link to={`/course/${course._id}`}>
        <img src={imageUrl} alt={course.title} />
        <div className="course-card-body">
          <h3>{course.title}</h3>
          <p>{course.description.substring(0, 100)}...</p>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;