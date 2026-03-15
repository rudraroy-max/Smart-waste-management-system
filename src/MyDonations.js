import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/donations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDonations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching donations:', error);
      });
  }, []);

  return (
    <div>
      <h2>My Donations</h2>
      <table>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Quantity</th>
            <th>Donor</th>
            <th>Donation Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>{donation.foodDetails}</td>
              <td>{donation.quantity}</td>
              <td>{donation.donor}</td>
              <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyDonations;
