import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ isAuthenticated }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('isAdmin') === 'true' || sessionStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8085/movies');
        setMovies(response.data);
      } catch (err) {
        setError('Error fetching movies');
        console.error(err);
      }
    };
    fetchMovies();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleGenreChange = (e) => setSelectedGenre(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleRatingChange = (e) => setSelectedRating(e.target.value);

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? movie.genre === selectedGenre : true;
    const matchesYear = selectedYear ? movie.releaseYear === parseInt(selectedYear) : true;
    const matchesRating = selectedRating ? movie.rating >= parseFloat(selectedRating) : true;
    return matchesSearch && matchesGenre && matchesYear && matchesRating;
  });

  const handleShowtimeClick = (movie, showtime) => {
    if (!isAuthenticated) {
      alert('Please log in to proceed with booking.');
      navigate('/login');
      return;
    }
    navigate('/seat-selection', { state: { movieTitle: movie.title, showtime } });
  };

  const genres = [...new Set(movies.map(movie => movie.genre))];
  const years = [...new Set(movies.map(movie => movie.releaseYear))].sort((a, b) => b - a);

  // Separate movies into currently running and coming soon
  const currentlyRunningMovies = filteredMovies.filter(movie => movie.status === 'running');
  const comingSoonMovies = filteredMovies.filter(movie => movie.status === 'coming-soon');

  return (
    <div className="home-container">
      <header className="header">
        <h1>Cinema E-Booking System</h1>
        <nav>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="nav-button">Login</Link>
              <Link to="/register" className="nav-button">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/edit-profile" className="nav-button">Edit Profile</Link>
              <Link to="/cart" className="nav-button">Shopping Cart</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-button">Admin Dashboard</Link>
              )}
              <button className="nav-button logout-button" onClick={() => { 
                localStorage.removeItem('authToken');
                localStorage.removeItem('_id');
                localStorage.removeItem('isAdmin');
                sessionStorage.clear();
                window.location.reload();
              }}>Log Out</button>
            </>
          )}
        </nav>
      </header>

      <div className="filter-container">
        <input type="text" placeholder="Search for a movie..." value={searchTerm} onChange={handleSearchChange} />

        <div className="filter-options">
          <select value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>

          <select value={selectedYear} onChange={handleYearChange}>
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select value={selectedRating} onChange={handleRatingChange}>
            <option value="">All Ratings</option>
            {[7, 8, 9].map(rating => (
              <option key={rating} value={rating}>{rating} and above</option>
            ))}
          </select>
        </div>
      </div>

      {/* Currently Running Movies Section */}
      <h2>Currently Running Movies</h2>
      <div className="movie-list">
        {error && <p>{error}</p>}
        {currentlyRunningMovies.length === 0 ? (
          <p>No currently running movies match your criteria.</p>
        ) : (
          currentlyRunningMovies.map(movie => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <div className="movie-trailer-container">
                <iframe src={movie.trailer} title={movie.title} className="movie-trailer" allowFullScreen />
              </div>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Release Year:</strong> {movie.releaseYear}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
              <div className="showtimes">
                {movie.showtimes && movie.showtimes.map(showtime => (
                  <button key={showtime._id} className="showtime-button" onClick={() => handleShowtimeClick(movie, showtime.time)}>
                    {showtime.time}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Coming Soon Movies Section */}
      <h2>Coming Soon Movies</h2>
      <div className="movie-list">
        {comingSoonMovies.length === 0 ? (
          <p>No coming soon movies match your criteria.</p>
        ) : (
          comingSoonMovies.map(movie => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <div className="movie-trailer-container">
                <iframe src={movie.trailer} title={movie.title} className="movie-trailer" allowFullScreen />
              </div>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Release Year:</strong> {movie.releaseYear}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;











