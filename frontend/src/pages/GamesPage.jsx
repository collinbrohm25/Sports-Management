import React, { useState, useEffect } from 'react';
import GameList from '../components/GameList';
import { fetchGames } from '../services/api';

const GamesPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames().then(data => setGames(data));
  }, []);

  return (
    <div>
      <h1>Games</h1>
      <GameList games={games} />
    </div>
  );
};

export default GamesPage;
