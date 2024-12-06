import React from "react";
import "./ResultList.css";


function ResultList({ results }) {
  // Extract game_data if it exists
  const processedResults = results?.game_data || [];

  if (processedResults.length === 0) {
    return <p>No results to display.</p>;
  }

  return (
    <div className="result-list-container">
      <h3 className="text-xl font-bold mb-4">Game Results</h3>
      <table className="results-table">
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Home Points</th>
            <th>Away Points</th>
          </tr>
        </thead>
        <tbody>
          {processedResults.map((result, index) => (
            <tr key={index}>
              <td>{result.home_team_name}</td>
              <td>{result.away_team_name}</td>
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
