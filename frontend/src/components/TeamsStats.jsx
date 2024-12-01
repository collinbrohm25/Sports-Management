import React, { useEffect, useState } from 'react';
import './TeamStats.css';
import { fetchTeams } from '../services/api';
import TeamStats from '../components/TeamStats';

const TeamStats = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams()
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching team stats:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading team statistics...</p>;
  }

  return (
    <div className="team-stats">
      <h2>Team Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Games Played</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Points Scored</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.games_played}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.points_scored}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamStats;
