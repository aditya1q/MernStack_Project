import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserLoggedIn } from '../../store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useUserLoggedIn();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
      .then(response => {
        console.log(response.data);
        if (response.data.authenticated) {
          navigate('/dashboard');
        }
      })
      .catch(() => {
        console.error('User not authenticated');
      });
  }, [navigate]);


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
      .post('http://localhost:8000/api/auth/login',
        formData,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data)
        setSuccess(res.data.message);
        setError('');
        if (res.data.message === 'login successfully') {
          // Redirect to dashboard or other authenticated page
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'An error occurred');
        setSuccess('');
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-black mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
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
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              value={formData.username}
              type="username"
              id="username"
              placeholder="Enter your username"
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
