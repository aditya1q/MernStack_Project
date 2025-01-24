import express from 'express';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

// Define routes
router.post('/login', loginUser);
router.post('/logout', loginUser);

export default router;
