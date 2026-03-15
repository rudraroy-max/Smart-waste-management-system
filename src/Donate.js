import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './Donate.css';

const Donate = () => {
  const [foodDetails, setFoodDetails] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!foodDetails || !quantity || !image) {
      setMessage({ type: 'error', text: 'Please fill in all fields and upload an image.' });
      return;
    }
    if (quantity <= 0) {
      setMessage({ type: 'error', text: 'Quantity must be greater than 0.' });
      return;
    }

    const formData = new FormData();
    
    formData.append('foodDetails', foodDetails);
    formData.append('quantity', quantity);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/donate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Server response:', response.data);
      setMessage({
        type: 'success',
        text: response.data.message || 'Donation recorded successfully!',
      });
      setFoodDetails('');
      setQuantity('');
      setImage(null);
      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      console.error('Donation error:', error.response?.data, error.message);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error during donation.',
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Donate Food</h2>
      <form onSubmit={handleDonate}>
        <div className="input-field">
          <input
            type="text"
            placeholder="Food Details"
            value={foodDetails}
            onChange={(e) => setFoodDetails(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit" className="submit-btn">
          Donate
        </button>
      </form>
      {message && (
        <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Donate;