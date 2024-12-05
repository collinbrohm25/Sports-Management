import React from 'react';

const OrderSummary = ({ orderDetails }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      <div>
        {orderDetails.tickets.map((ticket, index) => (
          <div key={index}>
            <p>Movie: {ticket.movieTitle}</p>
            <p>Price: ${ticket.price}</p>
          </div>
        ))}
        <h3>Total: ${orderDetails.totalPrice}</h3>
      </div>
      <button>Confirm Order</button>
    </div>
  );
};

export default OrderSummary;