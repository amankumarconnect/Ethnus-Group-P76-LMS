import express from 'express';
const router = express.Router();
import { createCheckoutSession, verifySession } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

// The 'protect' middleware ensures only logged-in users can create a session
router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/verify-session', protect, verifySession);


export default router;