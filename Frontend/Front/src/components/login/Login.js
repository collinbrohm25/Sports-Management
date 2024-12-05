import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link from react-router-dom
import './Login.css'; // Import the CSS file

const Login = ({ setIsAuthenticated }) => { // Accept setIsAuthenticated as a prop
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/users/login', credentials);
      const { _id, token, isAdmin } = response.data;
    
      if (!_id || !token) {
        throw new Error('Invalid login response');
      }

      console.log('Login successful:', response.data); 
      console.log('User id:', response.data._id);
      console.log('User is a admin:', response.data.isAdmin);

      // Save token and id based on Remember Me choice
      /*
      if (rememberMe) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userID', _id);
        localStorage.setItem('isAmin', isAdmin);
      } else { */

      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userID', _id);
      sessionStorage.setItem('isAdmin', isAdmin);

      // Update the authentication state
      setIsAuthenticated(true); // Call the setIsAuthenticated prop

      // Redirect to home page
      navigate('/');
    } catch (error) {
      setError(error.response ? error.response.data.msg : "Login error. Please try again."); // Set error message
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        
        {/* Remember Me Checkbox with text next to it */}
        <div className="remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe" style={{ display: 'inline-block', marginLeft: '5px' }}>Remember Me</label>
        </div>

        <button type="submit">Login</button>

        {/* Add the Forgot Password link here */}
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>

        {/* Display Signup option */}
        <div className="signup-option">
          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;

