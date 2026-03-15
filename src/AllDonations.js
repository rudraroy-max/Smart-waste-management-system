import React, { useEffect, useState } from 'react';
import './AllDonations.css';
import axios from 'axios';

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // List of fallback images for variety
  const fallbackImages = [
    'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
    'https://images.unsplash.com/photo-1472141521881-95d0e87e2e39',
    'https://cdn.pixabay.com/photo/2017/09/30/15/10/plate-2802332_1280.jpg',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.unsplash.com/photo-1504672281656-e3e7f4dd39b2'
  ];

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/all-donations')
      .then(response => {
        setDonations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching donations:", error);
        setError("Failed to load donations. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Function to get a random fallback image
  const getRandomFallbackImage = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
  };

  return (
    <div className="donations-container">
      <h1>All Donations</h1>
      <div className="donations-grid">
        {loading ? (
          <p>Loading donations...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : donations.length > 0 ? (
          donations.map(donation => (
            <div className="donation-card" key={donation._id}>
              <img 
                src={donation.image ? `http://localhost:5000/uploads/${donation.image}` : getRandomFallbackImage()} 
                alt={donation.foodDetails || "Donation"} 
                className="donation-image"
                onError={(e) => (e.target.src = getRandomFallbackImage())} // Random fallback on error
              />
              <h3>{donation.foodDetails || "Unknown Food Item"}</h3>
              <p><strong>Donor:</strong> {donation.donor || "Anonymous"}</p>
              <p><strong>Quantity:</strong> {donation.quantity || "N/A"}</p>
            </div>
          ))
        ) : (
          <p>No donations found.</p>
        )}
      </div>
    </div>
  );
};

export default AllDonations;