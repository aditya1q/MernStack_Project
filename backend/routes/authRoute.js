import express from 'express';
import { loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// Define routes
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
