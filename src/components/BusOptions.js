import React, { useState } from "react";
import { Card, Badge, Row, Col, Button } from "react-bootstrap";
import BusBooking from "./BusBooking";

const formatTime = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const BusDetails = ({ bus, setSelectedBus }) => {
  const handleBook = () => {
    setSelectedBus(bus);
  };

  if (!bus) return null;

  const {
    CompanyName,
    DepartureTime,
    ArrivalTime,
    RouteName,
    Fare,
    AvailableSeats,
    HasAC,
    HasSeater,
    HasSleeper,
    Arrangement,
    BusNumber,
    ServiceType,
    OnTimePercentage,
  } = bus;

  return (
    <Card
      className="mb-3 shadow-sm border-0"
      style={{
        borderRadius: "12px",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onClick={handleBook}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 123, 255, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
    >
      <Card.Body>
        <Row className="align-items-center gy-2">
          <Col md={4}>
            <h5 className="mb-1">{CompanyName.toUpperCase()}</h5>
            <p className="text-muted mb-2 small">{RouteName}</p>
            <Badge bg="secondary" pill>
              {BusNumber}
            </Badge>
          </Col>

          <Col md={3}>
            <div>
              <strong>Departure:</strong> {formatTime(DepartureTime)}
            </div>
            <div>
              <strong>Arrival:</strong> {formatTime(ArrivalTime)}
            </div>
          </Col>

          <Col md={3}>
            <div>
              <strong>Seats:</strong>{" "}
              <Badge bg={AvailableSeats > 0 ? "success" : "danger"} pill>
                {AvailableSeats}
              </Badge>
            </div>
            <div>
              <strong>Fare:</strong>{" "}
              <span className="text-success fw-semibold">₹{Fare}</span>
            </div>
            <div>
              <strong>Type:</strong>{" "}
              <Badge bg={HasAC ? "info" : "secondary"} pill className="me-1">
                {HasAC ? "AC" : "Non-AC"}
              </Badge>
              {HasSeater && (
                <Badge bg="primary" pill className="me-1">
                  Seater
                </Badge>
              )}
              {HasSleeper && (
                <Badge bg="dark" pill>
                  Sleeper
                </Badge>
              )}
            </div>
          </Col>

          <Col md={2} className="text-end">
            <Badge bg="warning" pill className="mb-2">
              {Arrangement}
            </Badge>
            <div className="text-success fw-semibold mb-3">
              On Time: {OnTimePercentage}%
            </div>
            <Button variant="primary" size="sm" onClick={handleBook}>
              Book Now
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const BusOptions = ({ options }) => {
  const [selectedBus, setSelectedBus] = useState(null);

  return selectedBus ? (
    <BusBooking details={selectedBus} setDetails={setSelectedBus} />
  ) : (
    <div>
      {options.map((option) => (
        <BusDetails key={option.RouteScheduleId} bus={option} setSelectedBus={setSelectedBus} />
      ))}
    </div>
  );
};

export default BusOptions;
