import auth from '../models/auth.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required' });
    }

    // Save the user to the database
    const newUser = new auth({ email, password });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'login successfully', user: savedUser });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const logoutUser = async (req, res) => {

}