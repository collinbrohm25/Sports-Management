import React, { useState } from "react";
import axios from "axios";

function AddData() {
  const [formData, setFormData] = useState({ name: "", details: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/sports", formData)
      .then((response) => {
        alert("Data added successfully!");
        setFormData({ name: "", details: "" });
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  return (
    <div>
      <h2>Add Sports Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Details:</label>
          <input
            type="text"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddData;
