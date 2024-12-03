import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = ({ setIsAuthenticated }) => { // Accept setIsAuthenticated as a prop
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    promotions: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      promotions: formData.promotions,
    };

    try {
      const response = await axios.post('http://localhost:8085/users/register', registrationData, {
        headers: {
          'Content-Type': 'application/json' // Ensure the content type is set
        }
      });

      // Store the token in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userID', response.data._id);

      // Update the authentication state
      setIsAuthenticated(true);

      // Navigate back to home
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input 
          type="text" 
          name="firstName" 
          placeholder="First Name" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="lastName" 
          placeholder="Last Name" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
        />
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            name="promotions" 
            checked={formData.promotions} 
            onChange={() => setFormData({ ...formData, promotions: !formData.promotions })} 
          />
          Register for Promotion
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;


