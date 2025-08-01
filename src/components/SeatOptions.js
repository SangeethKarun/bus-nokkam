import React from "react";
import "./SeatOptions.css";

const SeatOptions = ({ seats }) => {
  if (seats.length === 0) return null;

  const maxRow = Math.max(...seats.map((s) => s.RowNo));
  const maxCol = Math.max(...seats.map((s) => s.ColumnNo));

  const getSeatClass = (seat) => {
    if (seat?.IsAisle) return "seat aisle";
    if (seat?.IsAvailable) return "seat available";
    return "seat booked";
  };

  return (
    <div className="container text-center">
      <div className="seat-grid">
        {[...Array(maxCol + 1)].map((_, colIndex) => (
          <div className="d-flex justify-content-center mb-2" key={colIndex}>
            {[...Array(maxRow + 1)].map((_, rowIndex) => {
              const seat = seats.find(
                (s) => s.ColumnNo === colIndex && s.RowNo === rowIndex
              );
              return (
                <div
                  key={`${colIndex}-${rowIndex}`}
                  className={getSeatClass(seat)}
                >
                  {seat?.SeatLabel || ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatOptions;
