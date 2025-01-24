import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserLoggedIn } from '../../store';
import { useNavigate } from 'react-router-dom';
import ls from 'localstorage-slim';

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useUserLoggedIn();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(true); // Loading state to delay rendering

  // Check localStorage to persist login state on component mount
  useEffect(() => {
    const user = ls.get('user');
    if (user) {
      setLoggedIn(true);
      navigate('/dashboard'); // Redirect to the dashboard if logged in
    } else {
      setLoggedIn(false);
      navigate('/'); // Redirect to login page
    }
    setLoading(false); // Loading check complete
  }, [setLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios
      .post('http://localhost:8000/api/login', { email: formData.email, password: formData.password })
      .then((res) => {
        ls.set('user', formData.email); // Store user data in localStorage
        setLoggedIn(true);
        navigate('/dashboard');
        console.log(res.data);
      })
      .catch((err) => {
        setLoggedIn(false);
        navigate('/'); // Redirect to login page on failure
        console.log(err);
      });
  };

  // Prevent rendering while loading state is true
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-black mb-4">Login</h2>
        <form onSubmit={handleSubmitForm}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={formData.email}
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={formData.password}
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
