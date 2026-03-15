import React, { useState } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import SuccessStories from './SuccessStories';
import AllDonations from './AllDonations';
import Donate from './Donate';
import Profile from './Profile';
import './App.css';

// ProtectedRoute component to restrict access
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  // Handle login
  const handleLogin = () => {
    console.log('Login: Setting isAuthenticated to true');
    setIsAuthenticated(true);
  };

  // Handle registration (same as login for simplicity)
  const handleRegister = () => {
    console.log('Register: Setting isAuthenticated to true');
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    console.log('Logout: Clearing token and setting isAuthenticated to false');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className={isAuthenticated ? 'App' : 'App-no-navbar'}>
      {isAuthenticated && (
        <Navbar onLogout={handleLogout}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all-donations">All Donations</Link></li>
            <li><Link to="/success-stories">Success Stories</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </Navbar>
      )}

      <Routes>
        {/* Public Routes (accessible without login) */}
        <Route path="/login" element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />

        {/* Protected Routes (require login) */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-donations"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AllDonations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success-stories"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SuccessStories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donate"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Donate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to login if not authenticated, else home */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;