import React, { useEffect, useState } from 'react';
import './VenueDetails.css';
import { fetchVenues } from '../services/api';

const VenueDetails = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues()
      .then(data => {
        setVenues(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching venue details:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading venue details...</p>;
  }

  return (
    <div className="venue-details">
      <h2>Venue Details</h2>
      <table>
        <thead>
          <tr>
            <th>Venue Name</th>
            <th>City</th>
            <th>State</th>
            <th>Capacity</th>
            <th>Surface</th>
          </tr>
        </thead>
        <tbody>
          {venues.map(venue => (
            <tr key={venue.id}>
              <td>{venue.name}</td>
              <td>{venue.city}</td>
              <td>{venue.state}</td>
              <td>{venue.capacity}</td>
              <td>{venue.surface}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenueDetails;
