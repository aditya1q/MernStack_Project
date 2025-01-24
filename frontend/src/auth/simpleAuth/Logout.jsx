import React from 'react'
import { useUserLoggedIn } from '../../store';
import ls from 'localstorage-slim'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const { setLoggedIn } = useUserLoggedIn();

    const handleLogout = () => {
        ls.clear(); // Remove token from localstorage
        setLoggedIn(false); // Update global state to logged out
        navigate('/'); // Redirect to login page
    };

    return (
        <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
            Logout
        </button>
    );
}

export default Logout