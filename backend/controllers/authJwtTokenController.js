import { createSecretToken } from '../utils/SecretToken.js';
import user from '../models/jwtTokenAuth.js';

export const userLogin = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Validate the input
        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Email, username and Password are required' });
        }

        const existingUser = await user.findOne({ email });
        // checking if user already exist
        if (existingUser) {
            return res.json({ message: 'User already exists' });
        }
        // create new user and set token
        const User = await user.create({ email, username, password });
        const token = createSecretToken(User._id);
        // console.log(token)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // 'false' for local development
            sameSite: 'None', // Explicitly allow cross-origin
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            path: '/', // Ensure the cookie is accessible on all routes
        });
        res.status(201).json({ message: "login successfully", success: true, User, });
    }
    catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'server error', error });
    }
}

export const checkUserLogin = async (req, res) => {
    console.log(req.cookies)
    if (req.cookies.token) {
        return res.json({ authenticated: true });
    }
    res.json({ authenticated: false });
}