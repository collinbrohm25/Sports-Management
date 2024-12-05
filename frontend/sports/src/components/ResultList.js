import React from "react";
import "./ResultList.css";

function ResultList({ results }) {
  if (!results || results.length === 0) {
    return <p>No results to display.</p>;
  }

  return (
    <div className="result-list-container">
      <h3>Match Results and Weather Conditions</h3>
      <table className="results-table">
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Venue</th>
            <th>Home Points</th>
            <th>Away Points</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.home_team_name}</td>
              <td>{result.away_team_name}</td>
              <td>{result.venue}</td>
              <td>{result.home_points}</td>
              <td>{result.away_points}</td>
              <td>{result.weather}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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