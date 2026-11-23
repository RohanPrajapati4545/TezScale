import express from 'express';
import { loginAdmin, getAdminProfile } from '../controllers/authController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import { loginRateLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// Protected with brute-force rate limiter (max 5 failed attempts per 15 mins)
router.post('/login', loginRateLimiter, loginAdmin);
router.get('/me', protectAdmin, getAdminProfile);

export default router;
