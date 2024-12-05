import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import OrderSummary from './components/orderSummary/OrderSummary';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import SeatSelection from './components/seatSelection/SeatSelection';
import Checkout from './components/checkout/Checkout';
import EditProfile from './components/editProfile/EditProfile';
import ForgotPassword from './components/forgotPassword/ForgotPassword'; // Use the correct path for ForgotPassword
import ResetPassword from './components/ResetPassword';   // Use the correct path for ResetPassword
// Import other components as needed

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authToken in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // Set authentication state if token exists
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          {/* Pass isAuthenticated and setIsAuthenticated to components where necessary */}
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          
          {/* Forgot Password and Reset Password Routes */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          {/* Add other routes as necessary */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
