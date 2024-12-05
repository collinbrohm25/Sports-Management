import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SeatSelection.css';

function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieTitle, showtime } = location.state || { movieTitle: '', showtime: '' };

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [birthdays, setBirthdays] = useState({});

  const seatMap = [
    ['A1', 'A2', 'A3', 'A4', 'A5'],
    ['B1', 'B2', 'B3', 'B4', 'B5'],
    ['C1', 'C2', 'C3', 'C4', 'C5'],
    ['D1', 'D2', 'D3', 'D4', 'D5'],
  ];

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      const newSelectedSeats = selectedSeats.filter((s) => s !== seat);
      const { [seat]: removedBirthday, ...remainingBirthdays } = birthdays;
      setSelectedSeats(newSelectedSeats);
      setBirthdays(remainingBirthdays);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setBirthdays({ ...birthdays, [seat]: '' });
    }
  };

  const handleBirthdayChange = (seat, value) => {
    setBirthdays({ ...birthdays, [seat]: value });
  };

  const handleConfirmSeats = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    for (const seat of selectedSeats) {
      if (!birthdays[seat]) {
        alert(`Please enter a birthday for seat ${seat}.`);
        return;
      }
    }
    navigate('/checkout', { state: { movieTitle, showtime, selectedSeats, birthdays } });
  };

  return (
    <div className="select-seats-container">
      <h1>Select Your Seats for {movieTitle}</h1>
      <h3>Showtime: {showtime}</h3>

      <div className="seat-map">
        {seatMap.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat) => (
              <div key={seat} className="seat-container">
                <button
                  className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                  onClick={() => handleSeatClick(seat)}
                  aria-pressed={selectedSeats.includes(seat)}
                >
                  {seat}
                </button>
                {selectedSeats.includes(seat) && (
                  <input
                    type="date"
                    value={birthdays[seat] || ''}
                    onChange={(e) => handleBirthdayChange(seat, e.target.value)}
                    className="birthday-input"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={handleConfirmSeats} className="confirm-seats-btn">
        Confirm Seats
      </button>
    </div>
  );
}

export default SeatSelection;
