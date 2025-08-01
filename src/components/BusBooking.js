import React, { useEffect, useState } from "react";
import SeatOptions from "./SeatOptions";

const BusBooking = ({ details, setDetails }) => {
  const [seats, setSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchSeats = async () => {
    try {
      setIsLoading(true);
      const apiLink = `https://onlineksrtcswift.com/api/resource/seatArrangement?routeID=${details.RouteScheduleId}&journeyDate=${details.ChartDate}`;
      const response = await fetch(apiLink);
      const result = await response.json();
      setSeats(result.APIGetChartMicrositeResult.Seats);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <div className="container mt-4">
      <button onClick={() => setDetails(null)}>Close</button>

      <div className="card p-3 mb-4 shadow">
        <div className="row">
          {" "}
          <div className="col-md-6">
            <h2>{details.RouteName}</h2>
            <div>
              <h4>{details.CompanyName}</h4>
              <p>
                <strong>Service:</strong> {details.ServiceType}
              </p>
              <p>
                <strong>Departure:</strong>{" "}
                {new Date(details.DepartureTime).toLocaleString()}
                <br />
                <strong>Arrival:</strong>{" "}
                {new Date(details.ArrivalTime).toLocaleString()}
              </p>
              <p>
                <strong>Fare:</strong> ₹{details.Fare}
              </p>
              <p>
                <strong>Available Seats:</strong> {details.AvailableSeats}
              </p>
              <p>
                <strong>Precautions:</strong>
                <br />
                {details.TravellerPrecautions.split("~~~").map(
                  (line, index) => (
                    <li key={index}>{line}</li>
                  )
                )}
              </p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            {isLoading ? (
              <div
                style={{ height: 100 }}
              >
                <progress />
              </div>
            ) : (
              <SeatOptions seats={seats}></SeatOptions>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusBooking;
