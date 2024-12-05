import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import ResultList from "./ResultList";


function Home() {
  const [teamName, setTeamName] = useState("");
  const [week, setWeek] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const params = new URLSearchParams();
    if (teamName) params.append("team", teamName);
    if (week) params.append("week", week);

    axios
      .get(`http://localhost:5000/api/sports?${params.toString()}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch data. Please try again.");
      });
  };

  return (
    <div className="home-container">
      <div className="form-header">
        <h2>Search Sports Data</h2>
      </div>
      <form className="form-section" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="teamName">Team Name</label>
          <input
            id="teamName"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="week">Week Number</label>
          <input
            id="week"
            type="number"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            placeholder="Enter week number (optional)"
            min="1"
          />
        </div>
        <div className="btn-group">
          <button type="submit">Search</button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

<div className="results-section">
  <ResultList results={results} />
</div>

    </div>
  );
}

export default Home;
