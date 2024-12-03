import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { data } from '@remix-run/router';

const AdminDashboard = () => {
  const [view, setView] = useState('menu'); // Tracks which section is active
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [users, setUsers] = useState([]);
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    director: '',
    genre: '',
    releaseYear: '',
    duration: '',
    rating: '',
    status: '',
    trailer: '',
    showtimes: [],
  });
  const [newMovie, setNewMovie] = useState({
    title: '',
    director: '',
    genre: '',
    releaseYear: '',
    duration: '',
    rating: '',
    status: '',
    trailer: '',
  });
  const [schedule, setSchedule] = useState({
    movieId: '',
    showroom: '',
    date: '',
    time: '',
  });
  const [showrooms, setShowrooms] = useState([]); // Dynamically fetched showrooms
  const [scheduledMovies, setScheduledMovies] = useState([]);

  const [promotions, setPromotions] = useState([]); // Holds the list of promotions
  const [newPromotion, setNewPromotion] = useState({
    name: '',
    amount: '',
    promoCode: '',
  }); // Holds the new promotion details


  useEffect(() => {
    // Fetch movies, users, showrooms, and scheduled movies
    const fetchData = async () => {
      try {
        const moviesResponse = await axios.get('http://localhost:8085/movies');
        setMovies(moviesResponse.data);

        const usersResponse = await axios.get('http://localhost:8085/users');
        setUsers(usersResponse.data);

        const showroomsResponse = await axios.get('http://localhost:8085/showrooms');
        setShowrooms(showroomsResponse.data); // Fetch showrooms from the backend

        const promotionsResponse = await axios.get('http://localhost:8085/promotions');
        setPromotions(promotionsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleInputChange = (e, stateUpdater) => {
    const { name, value } = e.target;
    stateUpdater((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectMovie = (movieId) => {
    setSelectedMovie(movieId);
    // Fetch movie details
    axios
      .get(`http://localhost:8085/movies/${movieId}`)
      .then((response) => setMovieDetails(response.data))
      .catch((error) => console.error("Error fetching movie details:", error));
  };

  const handleUpdateMovie = () => {
    // Update movie details
    axios
      .put(`http://localhost:8085/movies/${selectedMovie}`, movieDetails)
      .then((response) => alert("Movie updated successfully"))
      .catch((error) => console.error("Error updating movie:", error));
  };

  const handleAddNewMovie = async () => {
    const { title, director, genre, releaseYear, duration, rating, status, trailer } = newMovie;
  
    if (!title || !director || !genre || !releaseYear || !duration || !rating || !status || !trailer) {
      alert('All fields are required to add a new movie!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8085/movies', newMovie);
      alert('Movie added successfully!');
      setMovies((prevMovies) => [...prevMovies, response.data]); // Update movie list
      setNewMovie({
        title: '',
        director: '',
        genre: '',
        releaseYear: '',
        duration: '',
        rating: '',
        status: '',
        trailer: '',
      }); // Reset the form
    } catch (err) {
      console.error('Error adding movie:', err);
      alert('Failed to add movie');
    }
  };  

  const handleDeleteMovie = () => {
    // Delete the movie
    axios
      .delete(`http://localhost:8085/movies/${selectedMovie}`)
      .then((response) => {
        alert("Movie deleted successfully");
        setMovies(movies.filter((movie) => movie._id !== selectedMovie));
        setSelectedMovie(null);
        setMovieDetails({
          title: "",
          director: "",
          genre: "",
          releaseYear: "",
          duration: "",
          rating: "",
          status: "",
          trailer: "",
          showtimes: [],
        });
      })
      .catch((error) => console.error("Error deleting movie:", error));
  };

  const scheduleMovie = async () => {
    const { movieId, showroom, date, time } = schedule;
    if (!movieId || !showroom || !date || !time) {
      alert('All fields are required!');
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:8085/showrooms/${showroom}/schedule`, {
          movieId,
          date,
          time
      });
      alert('Movie scheduled successfully!');
      setSchedule({ movieId: '', showroom: '', date: '', time: '' });
    } catch (error) {
        console.error(error);
        alert(`Error scheduling movie: ${error.response?.data?.error || error.message}`);
    }
  };  

  // Delete a user
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user')) {
      try {
        console.log("UserID to be deleted:", id)
        await axios.delete(`http://localhost:8085/users/deleteUser/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        alert("User has been deleted");
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  // Add a promotion
  const addNewPromotion = async () => {
    const { name, amount, promoCode } = newPromotion;
    if (!name || !amount || !promoCode) {
      alert('All promotion fields are required!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8085/promotions', newPromotion);
      alert('Promotion added successfully!');
      setPromotions((prev) => [...prev, response.data]); // Add the new promotion to the list
      setNewPromotion({ name: '', amount: '', promoCode: '' }); // Reset the form
    } catch (err) {
      console.error('Error adding promotion:', err);
    }
  };

  // Delete a promotion
  const deletePromotion = async (id) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      try {
        await axios.delete(`http://localhost:8085/promotions/${id}`);
        setPromotions(promotions.filter((promo) => promo._id !== id));
      } catch (error) {
        console.error('Error deleting promotion:', error);
        alert('Failed to delete promotion');
      }
    }
  };
  
  // Send a promotion email
  const sendPromoEmail = async (promotionId) => {
    console.log("Promotion ID:", promotionId);
    if (window.confirm('Are you sure you want to send this promotion to all subscribers?')) {
      try {
        await axios.post(`http://localhost:8085/promotions/${promotionId}/send-email`);
        alert('Emails sent successfully!');
      } catch (err) {
        console.error('Error sending emails:', err);
        alert('Failed to send emails. Please try again.');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <button onClick={() => handleViewChange('menu')}>Main Menu</button>
        <button onClick={() => handleViewChange('movies')}>Manage Movies</button>
        <button onClick={() => handleViewChange('schedule')}>Schedule Movie</button>
        <button onClick={() => handleViewChange('users')}>Manage Users</button>
        <button onClick={() => handleViewChange('promotions')}>Manage Promotions</button>
      </nav>

      {view === 'menu' && <h2>Welcome to the Admin Dashboard</h2>}

      {view === 'movies' && (
        <div>
          <h2>Manage Movies</h2>
          {/* Dropdown for movies */}
          <select onChange={(e) => handleSelectMovie(e.target.value)}>
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>

          {selectedMovie && (
            <div>
              {/* Movie details form */}
              <h3>Edit Movie</h3>
              <form>
                <label>Title:</label>
                <input
                  type="text"
                  value={movieDetails.title}
                  onChange={(e) =>
                    setMovieDetails({ ...movieDetails, title: e.target.value })
                  }
                  placeholder="Title"
                />
                <label>Director:</label>
                <input
                  type="text"
                  value={movieDetails.director}
                  onChange={(e) =>
                  setMovieDetails({ ...movieDetails, director: e.target.value })
                  }
                  placeholder="Director"
                />
                <label>Genre:</label>
                <input
                  type="text"
                  value={movieDetails.genre}
                  onChange={(e) =>
                    setMovieDetails({ ...movieDetails, genre: e.target.value })
                  }
                  placeholder="Genre"
                />
                <label>Release Year:</label>
                <input
                  type="number"
                  value={movieDetails.releaseYear}
                  onChange={(e) =>
                    setMovieDetails({
                      ...movieDetails,
                      releaseYear: e.target.value,
                    })
                  }
                  placeholder="Release Year"
                />
                <label>Duration (minutes):</label>
                <input
                  type="number"
                  value={movieDetails.duration}
                  onChange={(e) =>
                    setMovieDetails({ ...movieDetails, duration: e.target.value })
                  }
                  placeholder="Duration (minutes)"
                />
                <label>Rating:</label>
                <input
                  type="number"
                  step="0.1"
                  value={movieDetails.rating}
                  onChange={(e) =>
                    setMovieDetails({ ...movieDetails, rating: e.target.value })
                  }
                  placeholder="Rating (0-10)"
                />
                <label>Status:</label>
                <select
                  value={movieDetails.status}
                  onChange={(e) =>
                    setMovieDetails({ ...movieDetails, status: e.target.value })
                  }
                >
                  <option value="">Select Status</option>
                  <option value="running">Running</option>
                  <option value="coming-soon">Coming Soon</option>
                </select>
                <label>Trailer Link</label>
                <input
                  type="text"
                  value={movieDetails.trailer}
                  onChange={(e) =>
                    setMovieDetails({ ...movieDetails, trailer: e.target.value })
                  }
                  placeholder="Trailer URL"
                />
                {/* Repeat for other fields */}
              </form>
              <button onClick={handleUpdateMovie}>Update Movie</button>
              <button onClick={handleDeleteMovie}>Delete Movie</button>
            </div>
          )}

          <hr />

          {/* Add New Movie Section */}
          <h3>Add a New Movie</h3>
          <form>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newMovie.title}
              onChange={(e) => handleInputChange(e, setNewMovie)}
              placeholder="Title"
            />
            <label>Director:</label>
            <input
              type="text"
              name="director"
              value={newMovie.director}
              onChange={(e) => handleInputChange(e, setNewMovie)}
              placeholder="Director"
            />
            <label>Genre:</label>
            <input
              type="text"
              name="genre"
              value={newMovie.genre}
              onChange={(e) => handleInputChange(e, setNewMovie)}
              placeholder="Genre"
            />
            <label>Release Year:</label>
            <input
              type="number"
              name="releaseYear"
              value={newMovie.releaseYear}
              onChange={(e) => handleInputChange(e, setNewMovie)}
              placeholder="Release Year"
            />
            <label>Duration (minutes):</label>
            <input
              type="number"
              name="duration"
              value={newMovie.duration}
              onChange={(e) => handleInputChange(e, setNewMovie)}
              placeholder="Duration"
            />
            <label>Rating:</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={newMovie.rating}
              onChange={(e) => handleInputChange(e, setNewMovie)}
              placeholder="Rating (0-10)"
            />
            <label>Status:</label>
            <select
              name="status"
              value={newMovie.status}
              onChange={(e) => handleInputChange(e, setNewMovie)}
            >
              <option value="">Select Status</option>
              <option value="running">Running</option>
              <option value="coming-soon">Coming Soon</option>
            </select>
            <label>Trailer Link:</label>
            <input
              type="text"
              name="trailer"
              value={newMovie.trailer}
              onChange={(e) => handleInputChange(e, setNewMovie)}
              placeholder="Trailer URL"
            />
            <button type="button" onClick={handleAddNewMovie}>Add Movie</button>
          </form>
        </div>
      )}

      {view === 'schedule' && (
        <div>
          <h2>Schedule Movie</h2>
          <select name="movieId" value={schedule.movieId} onChange={(e) => handleInputChange(e, setSchedule)}>
            <option value="">Select a Movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
          <select name="showroom" value={schedule.showroom} onChange={(e) => handleInputChange(e, setSchedule)}>
            <option value="">Select a Showroom</option>
            {showrooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name}
              </option>
            ))}
          </select>
          <input type="date" name="date" value={schedule.date} onChange={(e) => handleInputChange(e, setSchedule)} />
          <input type="time" name="time" value={schedule.time} onChange={(e) => handleInputChange(e, setSchedule)} />
          <button onClick={scheduleMovie}>Schedule</button>
        </div>
      )}

      {view === 'users' && (
        <div>
          <h2>Manage Users</h2>
          <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Promotions Active</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.promotions ? 'Yes' : 'No'}</td>
                  <td>{user.admin ? 'Yes' : 'No'}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(user._id)}
                      style={{
                        color: 'white',
                        backgroundColor: 'red',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'promotions' && (
        <div>
          <h2>Manage Promotions</h2>
          <div>
            <h3>Add New Promotion</h3>
            <input
              type="text"
              name="name"
              placeholder="Promotion Name"
              value={newPromotion.name || ''}
              onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
            />
            <input
              type="number"
              name="amount"
              placeholder="Discount Amount"
              value={newPromotion.amount || ''}
              onChange={(e) => setNewPromotion({ ...newPromotion, amount: e.target.value })}
            />
            <input
              type="text"
              name="promoCode"
              placeholder="Promo Code"
              value={newPromotion.promoCode || ''}
              onChange={(e) => setNewPromotion({ ...newPromotion, promoCode: e.target.value })}
            />
            <button onClick={addNewPromotion}>Add Promotion</button>
          </div>
          <div>
            <h3>Existing Promotions</h3>
            <ul>
              {promotions.map((promotion) => (
                <li key={promotion._id}>
                  {promotion.name} - {promotion.amount}% off (Code: {promotion.promoCode})
                  <button
                    onClick={() => deletePromotion(promotion._id)}
                    style={{
                      marginLeft: '10px',
                      color: 'white',
                      backgroundColor: 'red',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => sendPromoEmail(promotion._id)}
                    style={{
                      marginLeft: '10px',
                      color: 'white',
                      backgroundColor: 'green',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                    >
                    Send Email to Subscribers
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;


