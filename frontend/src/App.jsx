import './App.css';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import { useUserLoggedIn } from './store';
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <div className="flex items-center justify-center h-screen w-full overflow-hidden bg-gray-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
