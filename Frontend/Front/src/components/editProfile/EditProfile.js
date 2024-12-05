import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    billingAddress: '',
    password: '',
    newPassword: '',
    paymentCards: [''],
    email: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [promotions, setPromotions] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        const user = localStorage.getItem('userID') || sessionStorage.getItem('userID');
        console.log("Token:", token);
        console.log("UserID:", user);
        const response = await axios.get(`http://localhost:8085/users/find/${user}`);
        console.log(response);

        const { firstName, lastName, billingAddress, email, paymentCards, promotions } = response.data;
        setFormData({ 
          firstName, 
          lastName, 
          billingAddress, 
          email, 
          paymentCards: paymentCards.length ? paymentCards : [''], 
          newPassword: '' // Reset newPassword if previously entered
        });
        setPromotions(promotions);
      } catch (error) {
        setErrorMessage('Failed to load user data. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCardChange = (index, value) => {
    const updatedCards = [...formData.paymentCards];
    updatedCards[index] = value;
    setFormData({ ...formData, paymentCards: updatedCards });
  };

  const addPaymentCard = () => {
    if (formData.paymentCards.length < 4) {
      setFormData({ ...formData, paymentCards: [...formData.paymentCards, ''] });
    } else {
      setErrorMessage('You cannot add more than 4 payment cards.');
    }
  };

  const removePaymentCard = (index) => {
    const updatedCards = formData.paymentCards.filter((_, i) => i !== index);
    setFormData({ ...formData, paymentCards: updatedCards });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (formData.billingAddress && formData.billingAddress.split(';').length > 1) {
      setErrorMessage('You cannot store more than one billing address.');
      return;
    }

    if (formData.newPassword) {
      setShowPasswordPrompt(true);
      return;
    }

    try {
      const response = await axios.put('http://localhost:8085/users/update-profile', {
        ...formData,
        promotions 
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      setSuccessMessage('Profile updated successfully!');
      navigate('/');
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const currentPassword = prompt("Please enter your current password:");
    if (!currentPassword) return;

    try {
      await axios.put('http://localhost:8085/users/change-password', {
        currentPassword,
        newPassword: formData.newPassword,
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      setSuccessMessage('Password updated successfully!');
      setShowPasswordPrompt(false);
      setFormData({ ...formData, newPassword: '' });
    } catch (error) {
      setErrorMessage('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing Address"
          value={formData.billingAddress}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          readOnly
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          onFocus={() => setShowPasswordPrompt(true)}
        />

        {showPasswordPrompt && (
          <button type="button" onClick={handlePasswordChange}>Confirm Password Change</button>
        )}

        <h4>Payment Cards (max 4)</h4>
        {formData.paymentCards.map((card, index) => (
          <div key={index} className="payment-card">
            <input
              type="text"
              placeholder={`Payment Card ${index + 1}`}
              value={card}
              onChange={(e) => handleCardChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => removePaymentCard(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addPaymentCard}>Add Payment Card</button>

        <div className="promotions-container">
          <input
            type="checkbox"
            checked={promotions}
            onChange={() => setPromotions(!promotions)}
          />
          <label>
            Register for Promotion
          </label>
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;




