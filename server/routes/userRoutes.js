import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

import { getMyCourses } from '../controllers/userController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/my-courses', protect, getMyCourses);

export default router;