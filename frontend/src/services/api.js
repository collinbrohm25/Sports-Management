const API_BASE_URL = 'http://localhost:5000';

export const fetchGames = async () => {
  const response = await fetch(`${API_BASE_URL}/games`);
  const data = await response.json();
  return data;
};

export const fetchTeams = async () => {
  const response = await fetch(`${API_BASE_URL}/teams`);
  const data = await response.json();
  return data;
};

export const fetchVenues = async () => {
  const response = await fetch(`${API_BASE_URL}/venues`);
  const data = await response.json();
  return data;
};
