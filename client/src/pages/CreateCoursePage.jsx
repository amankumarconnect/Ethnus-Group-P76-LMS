import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CreateCoursePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (!image) return null;
    const formData = new FormData();
    formData.append('image', image);
    try {
      setUploading(true);
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await api.post('/api/courses/upload', formData, config);
      setUploading(false);
      return data.image; // Returns the server path, e.g., /uploads/image-12345.png
    } catch (err) {
      setError('Image upload failed.');
      setUploading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const thumbnailPath = await handleImageUpload();
    if (!thumbnailPath && image) { // Checks if upload failed but an image was selected
      return;
    }
    
    try {
      // Add price to the post request
      const { data } = await api.post('/api/courses', {
        title,
        description,
        price,
        thumbnail: thumbnailPath,
      });
      navigate(`/course/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Course creation failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Course</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Thumbnail Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" />
        </div>
        
        <button type="submit" className="btn" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default CreateCoursePage;