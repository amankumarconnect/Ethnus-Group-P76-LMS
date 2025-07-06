import mongoose from 'mongoose';

// A sub-schema for lessons within a course
const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String, // URL to a video resource
    },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  thumbnail: {
    type: String, // Path to an uploaded image
    default: '/uploads/default-thumbnail.jpg',
  },
  lessons: [lessonSchema],
  // Optional: track enrolled students
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
export default Course;