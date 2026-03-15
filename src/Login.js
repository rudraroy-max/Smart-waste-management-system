import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import './Login.css';

const Login = ({ onLogin, isAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
        captchaToken,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      setMessage({ type: 'success', text: 'Login successful!' });
      onLogin();
      navigate('/');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Invalid credentials. Please try again.',
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-field">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ReCAPTCHA
          sitekey="6LcE8jQrAAAAAAoBOIdjX3zrQLjDyU5xgvpoSqDH"
          onChange={setCaptchaToken}
        />
        <button type="submit" className="submit-btn">Login</button>
      </form>
      {message && (
        <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
          {message.text}
        </div>
      )}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;