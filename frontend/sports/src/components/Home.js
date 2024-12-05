import React, { useState } from "react";
import axios from 'axios';

function Home() {
  const [teamName, setTeamName] = useState("");
  const [week, setWeek] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Build query parameters
    const params = new URLSearchParams();
    if (teamName) params.append("team", teamName);
    if (week) params.append("week", week);
    console.log(params.toString())
    
    axios.get(`http://localhost:5000/api/sports?${params.toString()}`, {
    //     headers: {
    //       "Content-Type": "application/json",  // No need to add "Origin"
    //     },
       })
        .then(response => {
          console.log(response.data);  // Handle success response
        })
        .catch(error => {
          console.error("Error:", error);  // Handle error response
        });
  };

  return (
    <div>
      <h2>Search Sports Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
          />
        </div>
        <div>
          <input
            type="number"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            placeholder="Enter week number (optional)"
            min="1"
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Results</h3>
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {item.name} - Week {item.week}: {item.details}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
