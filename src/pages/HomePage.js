import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EmptySectionWallpaper from "../components/EmptyStatePlaceholder";


const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Container className="mt-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1>Welcome to Bus Nokkam</h1>
          <p>Book your intercity and local bus rides with ease.</p>
          <Button variant="primary" onClick={()=>navigate("buses")}>
            Book a Bus
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_pVWE7POLK5BNUgTqWnwBmagpbyVxO4eBDw&s"
              alt="Comfortable Buses"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Comfortable Buses</Card.Title>
              <Card.Text>
                Enjoy clean and air-conditioned buses for your journey.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0uaiKa51BAXVkN_yXw5hqPMKs6kLn77Kww&s"
              alt="Easy Booking"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>Easy Booking</Card.Title>
              <Card.Text>
                Quickly search and reserve your seats online in minutes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Img
              style={{ height: "200px", objectFit: "cover" }}
              variant="top"
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60"
              alt="On-Time Rides"
            />
            <Card.Body>
              <Card.Title>On-Time Rides</Card.Title>
              <Card.Text>
                Trusted schedules and real-time tracking for peace of mind.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <EmptySectionWallpaper/>
    </Container>
  );
};

export default HomePage;
