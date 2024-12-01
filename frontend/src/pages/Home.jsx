import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Sports Analytics</h1>
      <nav>
        <Link to="/games">Games</Link> | 
        <Link to="/teams">Teams</Link> | 
        <Link to="/venues">Venues</Link>
      </nav>
    </div>
  );
};

export default Home;
