import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ isAuthenticated, onLogout }) => {
  const [username, setUsername] = useState('Anas');
  const [foodData, setFoodData] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Profile: isAuthenticated=', isAuthenticated); // Debug
    // Get username from localStorage, default to 'Anas'
    const storedUsername = localStorage.getItem('username') || 'Anas';
    console.log('Profile: username=', storedUsername); // Debug
    setUsername(storedUsername);

    // Load food data from localStorage
    const storedFoodData = JSON.parse(localStorage.getItem('foodData') || '[]');
    console.log('Profile: foodData=', storedFoodData); // Debug
    setFoodData(storedFoodData);
  }, []);

  const handleLogout = () => {
    console.log('Profile: Logging out'); // Debug
    localStorage.removeItem('username'); // Clear username, keep foodData
    onLogout();
    navigate('/login');
  };

  // Only redirect if explicitly no user data and not authenticated
  if (!isAuthenticated && username === 'Anas' && !localStorage.getItem('username')) {
    console.log('Profile: Redirecting to login'); // Debug
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-container">
      {message ? (
        <div className="error-message">{message.text}</div>
      ) : (
        <>
          <h2>Welcome, {username}!</h2>
          <div className="profile-details">
            <p><strong>Username:</strong> {username}</p>
          </div>
          <h3>Your Food Donations</h3>
          <div className="food-data">
            {foodData.length > 0 ? (
              <ul>
                {foodData.map((item, index) => (
                  <li key={index}>
                    Donated {item.quantity} of {item.food} on {item.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No donations yet.</p>
            )}
          </div>
          <div className="profile-actions">
            <button className="action-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;