import express from 'express';
import path from 'path';
import multer from 'multer';
const router = express.Router();
import {
  createCourse,
  getAllCourses,
  getCourseById,
  addLessonToCourse,
} from '../controllers/courseController.js';

import { enrollInCourse, getInstructorCourses } from '../controllers/courseController.js'; 

import { protect, instructor } from '../middleware/authMiddleware.js';

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Files will be saved in the 'uploads' folder
  },
  filename(req, file, cb) {
    // Create a unique filename to avoid overwrites
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Filter to allow only image files
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => checkFileType(file, cb),
});

// Route for uploading a single image for a course thumbnail
router.post('/upload', protect, instructor, upload.single('image'), (req, res) => {
  res.status(200).send({
    message: 'Image uploaded successfully',
    image: `/${req.file.path.replace(/\\/g, '/')}`, // Return the path to the file
  });
});

// Main course routes
router.route('/')
  .get(getAllCourses)
  .post(protect, instructor, createCourse);

router.route('/:id')
  .get(getCourseById);

router.route('/:id/lessons')
  .post(protect, instructor, addLessonToCourse);

  router.get('/instructor/my-courses', protect, instructor, getInstructorCourses);
router.post('/:id/enroll', protect, enrollInCourse);

export default router;