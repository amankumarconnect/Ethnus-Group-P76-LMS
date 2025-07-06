import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth.js';
import VideoModal from '../components/VideoModal.jsx';

const CoursePage = () => {
  const { id } = useParams();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  // States for Video Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  // Lesson form states
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/api/courses/${id}`);
        setCourse(data);
      } catch (err) {
        setError('Failed to fetch course details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setProcessing(true);
    try {
      const { data } = await api.post('/api/payments/create-checkout-session', { courseId: id });
      window.location.href = data.url;
    } catch (err) {
      setError('Could not connect to payment gateway. Please try again.');
      setProcessing(false);
    }
  };
  
  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/courses/${id}/lessons`, { title: lessonTitle, content: lessonContent, videoUrl: lessonVideoUrl });
      setCourse(data.course);
      setLessonTitle('');
      setLessonContent('');
      setLessonVideoUrl('');
    } catch (err) {
      alert('Failed to add lesson.');
    }
  };
  
  const openVideoModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setModalIsOpen(true);
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!course) return <div className="loading-spinner">Course not found.</div>; // Safeguard if course is null

  // --- THIS IS THE CORRECTED LOGIC ---
  const isInstructor = userInfo && course.instructor && userInfo._id === course.instructor._id;
  
  // Check if userInfo and userInfo.enrolledCourses exist AND is an array before calling .some()
  const isEnrolled = userInfo && Array.isArray(userInfo.enrolledCourses) && 
                     userInfo.enrolledCourses.some(c => 
                       (typeof c === 'string' ? c : c._id) === course._id
                     );
  
  const canViewLessons = isInstructor || isEnrolled;
  const imageUrl = `${api.defaults.baseURL}${course.thumbnail}`;

  return (
    <div className="container">
      <div className="course-detail-header">
        <img src={imageUrl} alt={course.title} />
        <h1>{course.title}</h1>
        <p>By {course.instructor.name}</p>
        <h2>Price: ${course.price.toFixed(2)}</h2>
      </div>
      <p>{course.description}</p>
      
      {/* Show Enroll button if user is not enrolled and not the instructor */}
      {!canViewLessons && (
        <button className="btn" onClick={handleEnroll} disabled={processing}>
          {processing ? 'Connecting...' : 'Enroll Now'}
        </button>
      )}
      
      {canViewLessons && (
        <>
          <h2>Lessons</h2>
          <ul className="lesson-list">
            {course.lessons.map((lesson, index) => (
              <li key={index} className="lesson-item">
                <h3>{lesson.title}</h3>
                <p>{lesson.content}</p>
                {lesson.videoUrl && (
                  <button className="btn" onClick={() => openVideoModal(lesson.videoUrl)}>Watch Video</button>
                )}
              </li>
            ))}
            {course.lessons.length === 0 && <p>No lessons yet.</p>}
          </ul>
        </>
      )}

      {/* Lesson creation form for instructor */}
      {isInstructor && (
          <div className="form-container">
          <h3>Add a New Lesson</h3>
          <form onSubmit={handleAddLesson}>
            <div className="form-group">
              <label>Lesson Title</label>
              <input type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Lesson Content</label>
              <textarea value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>YouTube Video URL</label>
              <input type="text" value={lessonVideoUrl} onChange={(e) => setLessonVideoUrl(e.target.value)} />
            </div>
            <button type="submit" className="btn">Add Lesson</button>
          </form>
        </div>
      )}
      
      <VideoModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} videoUrl={selectedVideo} />
    </div>
  );
};

export default CoursePage;