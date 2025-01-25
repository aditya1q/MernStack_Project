
// jwt token authentication
import './App.css';
import Login from './auth/simpleAuth/Login';
import Dashboard from './pages/Dashboard';
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







// simple auth app page

// import './App.css';
// import Login from './auth/simpleAuth/Login';
// import Dashboard from './pages/Dashboard';
// import { Routes, Route, Navigate } from 'react-router-dom'

// function App() {

//   return (
//     <div className="flex items-center justify-center h-screen w-full overflow-hidden bg-gray-100">
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
