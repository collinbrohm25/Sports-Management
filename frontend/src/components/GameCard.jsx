import React from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <h2>{game.home_team_name} vs {game.away_team_name}</h2>
      <p>Venue: {game.venue_name}</p>
      <p>Date: {new Date(game.scheduled).toLocaleString()}</p>
      <p>Score: {game.home_points} - {game.away_points}</p>
    </div>
  );
};

export default GameCard;
