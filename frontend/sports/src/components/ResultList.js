import React from "react";
import "./ResultList.css";

function ResultList({ results }) {
  if (results.length === 0) {
    return <p>No results to display.</p>;
  }

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
          {results.map((result, index) => (
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
