import Course from '../models/courseModel.js';

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = async (req, res, next) => {
  const { title, description, thumbnail } = req.body;
  try {
    const course = new Course({
      title,
      description,
      thumbnail, // The path to the image from the upload route
      instructor: req.user._id, // from 'protect' middleware
    });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).populate('instructor', 'name email');
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (course) {
      res.json(course);
    } else {
      res.status(404);
      throw new Error('Course not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Add a lesson to a course
// @route   POST /api/courses/:id/lessons
// @access  Private/Instructor
const addLessonToCourse = async (req, res, next) => {
  const { title, content, videoUrl } = req.body;
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      if (course.instructor.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('User not authorized to modify this course');
      }
      const lesson = { title, content, videoUrl };
      course.lessons.push(lesson);
      await course.save();
      res.status(201).json({ message: 'Lesson added successfully' });
    } else {
      res.status(404);
      throw new Error('Course not found');
    }
  } catch (error) {
    next(error);
  }
};

export { createCourse, getAllCourses, getCourseById, addLessonToCourse };