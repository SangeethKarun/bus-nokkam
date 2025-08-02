import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Spinner, ListGroup } from "react-bootstrap";
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
      console.error("Failed to fetch seats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh", padding: "40px 0" }}>
      <Container>
        <Button
          variant="link"
          onClick={() => setDetails(null)}
          className="mb-4"
          style={{ fontWeight: "600", textDecoration: "none" }}
        >
          ← Back to Search
        </Button>

        <Card
          className="shadow-sm"
          style={{
            borderRadius: "12px",
            padding: "30px",
            backgroundColor: "#fff",
          }}
        >
          <Row>
            <Col md={6} className="border-end border-light">
              <h2 className="mb-3" style={{ fontWeight: 700, color: "#212529" }}>
                {details.RouteName}
              </h2>
              <h5 className="text-primary mb-4">{details.CompanyName}</h5>

              <ListGroup variant="flush" className="mt-3 text-dark">
                <ListGroup.Item className="px-0 border-0">
                  <strong>Service Type:</strong> {details.ServiceType}
                </ListGroup.Item>
                <ListGroup.Item className="px-0 border-0">
                  <strong>Departure:</strong>{" "}
                  {new Date(details.DepartureTime).toLocaleString()}
                </ListGroup.Item>
                <ListGroup.Item className="px-0 border-0">
                  <strong>Arrival:</strong> {new Date(details.ArrivalTime).toLocaleString()}
                </ListGroup.Item>
                <ListGroup.Item className="px-0 border-0">
                  <strong>Fare:</strong> ₹{details.Fare}
                </ListGroup.Item>
                <ListGroup.Item className="px-0 border-0">
                  <strong>Available Seats:</strong> {details.AvailableSeats}
                </ListGroup.Item>
                <ListGroup.Item className="px-0 border-0">
                  <strong>Precautions:</strong>
                  <ul className="mb-0 mt-2 ps-3">
                    {details.TravellerPrecautions.split("~~~").map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "350px" }}
            >
              {isLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : seats.length ? (
                <SeatOptions seats={seats} />
              ) : (
                <p className="text-muted">No seat data available.</p>
              )}
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default BusBooking;
