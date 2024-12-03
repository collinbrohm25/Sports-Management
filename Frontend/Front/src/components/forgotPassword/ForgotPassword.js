import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); // store the user's email
  const [message, setMessage] = useState(''); // store success or error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to API to handle password reset
      await axios.post('http://localhost:8085/users/forgot-password', { email });
      setMessage('A new password has been sent to your email. Please check your inbox.'); // Update success message
    } catch (error) {
      console.error('Error sending password reset email:', error.response ? error.response.data : error.message);
      setMessage('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {!message ? ( // If there is no message, display the form
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Done</button>
        </form>
      ) : (
        <p>{message}</p> // If a message exists, show the message
      )}
    </div>
  );
};

export default ForgotPassword;
