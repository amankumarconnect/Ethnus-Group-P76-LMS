import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = async (req, res, next) => {
  // Add price to destructuring
  const { title, description, thumbnail, price } = req.body;
  try {
    const course = new Course({
      title,
      description,
      price, // Add price here
      thumbnail,
      instructor: req.user._id,
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
  // Add videoUrl to destructuring
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
      res.status(201).json({ message: 'Lesson added successfully', course });
    } else {
      res.status(404);
      throw new Error('Course not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Enroll a student in a course after successful payment
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (course && user) {
      // Add course to user's enrolled list and user to course's student list
      user.enrolledCourses.push(course._id);
      course.students.push(user._id);
      
      await user.save();
      await course.save();

      res.status(200).json({ message: 'Enrollment successful' });
    } else {
      res.status(404);
      throw new Error('Course or User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get courses created by an instructor
// @route   GET /api/courses/instructor/my-courses
// @access  Private/Instructor
const getInstructorCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
                                .populate('students', 'name email');
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

export { createCourse, getAllCourses, getCourseById, addLessonToCourse, enrollInCourse, getInstructorCourses };