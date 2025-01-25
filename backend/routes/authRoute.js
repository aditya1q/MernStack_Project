import express from 'express';
import { loginUser } from '../controllers/authController.js';
import { checkUserLogin, userLogin } from '../controllers/authJwtTokenController.js';

const router = express.Router();

// Define routes
router.post('/login', loginUser);
router.post('/auth/login', userLogin);
router.get('/check-auth', checkUserLogin);

export default router;
