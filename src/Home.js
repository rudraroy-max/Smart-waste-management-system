import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Share Food. Save Lives.</h1>
          <p>Together we can reduce food waste and feed the hungry.</p>
          <div className="hero-buttons">
            <Link to="/donate" className="btn">Donate Now</Link>
            <Link to="/register" className="btn secondary">Register</Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="features">
        <h2>Why Use FoodyBroos?</h2>
        <div className="feature-cards">
          <div className="hero-content">
            <div className="card">
              <img src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg" alt="Donate Food" />
              <h3>Easy Donations</h3>
              <p>Donate food in just a few clicks. Hassle-free and quick.</p>
            </div>
            <div className="card">
              <img src="https://images.unsplash.com/photo-1472141521881-95d0e87e2e39" alt="Verified Recipients" />
              <h3>Verified Recipients</h3>
              <p>We ensure your food reaches the right people.</p>
            </div>
            <div className="card">
              <img src="https://cdn.pixabay.com/photo/2017/09/30/15/10/plate-2802332_1280.jpg" alt="Track Donations" />
              <h3>Real-time Tracking</h3>
              <p>Track your donations and see the impact you’re making.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 FoodyBroos. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
