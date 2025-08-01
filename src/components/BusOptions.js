import React, { useEffect, useState } from "react";
import { Card, Badge, Row, Col } from "react-bootstrap";
import BusBooking from "./BusBooking";

const BusDetails = ({ bus, setSelectedBus }) => {
  const handleBook = (bus) => {
    console.log(bus)
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
    RouteScheduleId,
    ChartDate,
  } = bus;

  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={4}>
            <h5>{CompanyName}</h5>
            <p className="mb-1 text-muted">{RouteName}</p>
            <Badge bg="secondary">{BusNumber}</Badge>
          </Col>

          <Col md={3}>
            <div>
              <strong>Departure:</strong> {DepartureTime}
            </div>
            <div>
              <strong>Arrival:</strong> {ArrivalTime}
            </div>
          </Col>

          <Col md={3}>
            <div>
              <strong>Seats:</strong> {AvailableSeats}
            </div>
            <div>
              <strong>Fare:</strong> ₹{Fare}
            </div>
            <div>
              <strong>Type:</strong> {ServiceType || (HasAC ? "AC" : "Non-AC")}{" "}
              {HasSeater ? "Seater" : ""} {HasSleeper ? "Sleeper" : ""}
            </div>
          </Col>

          <Col md={2} className="text-end">
            <Badge bg="info">{Arrangement}</Badge>
            <div className="mt-2 text-success">
              On Time: {OnTimePercentage}%
            </div>
            <button
              className="btn btn-primary mt-2"
              onClick={() => handleBook(bus)}
            >
              Book Now
            </button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const BusOptions = ({ options }) => {
  const [selectedBus, setSelectedBus] = useState();
  return selectedBus ? (
    <BusBooking details={selectedBus} setDetails={setSelectedBus}/>
  ) : (
    <div>
      {options.map((option) => (
        <BusDetails bus={option} setSelectedBus={setSelectedBus} />
      ))}
    </div>
  );
};

export default BusOptions;
