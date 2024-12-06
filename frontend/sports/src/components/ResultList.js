const ResultList = ({ data }) => {
  // Check if `data.game_data` exists and is an array
  const gameData = data?.game_data || [];

  return (
    <table className="table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="p-2 border">Home Team</th>
          <th className="p-2 border">Away Team</th>
          <th className="p-2 border">Venue</th>
          <th className="p-2 border text-center">Home Points</th>
          <th className="p-2 border text-center">Away Points</th>
        </tr>
      </thead>
      <tbody>
        {gameData.map((game, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="p-2 border">{game.home_team_name}</td>
            <td className="p-2 border">{game.away_team_name}</td>
            <td className="p-2 border">
              {game.venue_id || 'No venue info'}
            </td>
            <td className="p-2 border text-center">{game.home_points}</td>
            <td className="p-2 border text-center">{game.away_points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultList;


/*
import React from "react";
import "./ResultList.css";

function ResultList() {
  // Mock data for testing
  const mockResults = [
    {
      away_team_name: "Lions",
      away_team_abbreviation: "LIO",
      away_team_games_played: 5,
      home_team_name: "Tigers",
      home_team_abbreviation: "TIG",
      home_team_games_played: 6,
      home_points: 24,
      away_points: 18,
    },
    {
      away_team_name: "Eagles",
      away_team_abbreviation: "EAG",
      away_team_games_played: 4,
      home_team_name: "Bears",
      home_team_abbreviation: "BEA",
      home_team_games_played: 5,
      home_points: 30,
      away_points: 27,
    },
    {
      away_team_name: "Wolves",
      away_team_abbreviation: "WOL",
      away_team_games_played: 7,
      home_team_name: "Sharks",
      home_team_abbreviation: "SHA",
      home_team_games_played: 7,
      home_points: 22,
      away_points: 29,
    },
  ];

  return (
    <div className="result-list-container">
      <h3>Match Results</h3>
      <table className="results-table">
        <thead>
          <tr>
            <th>Away Team</th>
            <th>Away Abbreviation</th>
            <th>Away Games Played</th>
            <th>Home Team</th>
            <th>Home Abbreviation</th>
            <th>Home Games Played</th>
            <th>Home Points</th>
            <th>Away Points</th>
          </tr>
        </thead>
        <tbody>
          {mockResults.map((result, index) => (
            <tr key={index}>
              <td>{result.away_team_name}</td>
              <td>{result.away_team_abbreviation}</td>
              <td>{result.away_team_games_played}</td>
              <td>{result.home_team_name}</td>
              <td>{result.home_team_abbreviation}</td>
              <td>{result.home_team_games_played}</td>
              <td>{result.home_points}</td>
              <td>{result.away_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultList;
*/
