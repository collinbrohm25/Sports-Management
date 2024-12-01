import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GamesPage from './pages/GamesPage';
import TeamsPage from './pages/TeamsPage';
import VenuesPage from './pages/VenuesPage';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/venues" element={<VenuesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
