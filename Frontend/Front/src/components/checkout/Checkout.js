import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieTitle, showtime, selectedSeats } = location.state;

  const ticketPrice = 10;
  const totalCost = selectedSeats.length * ticketPrice;
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment Successful!');
    navigate('/confirmation', { state: { movieTitle, showtime, selectedSeats, totalCost } });
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <p><strong>Movie:</strong> {movieTitle}</p>
        <p><strong>Showtime:</strong> {showtime}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
        <p><strong>Total Cost:</strong> ${totalCost}</p>
      </div>

      <div className="payment-form">
        <h2>Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              name="cardHolder"
              placeholder="Cardholder Name"
              value={paymentDetails.cardHolder}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentDetails.expiryDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="checkout-btn">Confirm Payment</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;