import React, { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import Select from "react-select";
import { Outlet } from "react-router-dom";
import BusOptions from "../components/BusOptions";
import EmptySectionWallpaper from "../components/EmptyStatePlaceholder";

const Buses = () => {
  const [busRoutes, setBusRoutes] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDestinations, setAvailableDestinations] = useState([]);
  const [availableBus, setAvailableBus] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [someError, setSomeError] = useState(null);

  const fetchBusList = async () => {
    try {
      const response = await fetch(
        "https://assets.onlineksrtcswift.com/api/resource/getCityList"
      );
      const result = await response.json();
      setBusRoutes(result.data);
    } catch (err) {
      console.error("Error fetching bus routes:", err);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://assets.onlineksrtcswift.com/api/resource/getStaticCityList"
      );
      const result = await response.json();
      const cityList = Object.entries(result.data).map(([id, name]) => ({
        value: id,
        label: name,
      }));
      setCities(cityList);
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  const handleSearchBus = async () => {
    if (!selectedFrom || !selectedTo || !selectedDate) {
      setSomeError("Please select all fields before searching.");
      setAvailableBus([]);
      return;
    }

    try {
      setSearchLoading(true);
      setSomeError(null);
      const apiLink = `https://onlineksrtcswift.com/api/resource/searchRoutesV4?fromCityID=${selectedFrom.value}&toCityID=${selectedTo.value}&journeyDate=${selectedDate}&mode=oneway`;
      const response = await fetch(apiLink);
      const result = await response.json();
      setAvailableBus(result);
    } catch (err) {
      setSomeError(err.message);
      setAvailableBus([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectFrom = (option) => {
    setSelectedFrom(option);
    setAvailableBus([]);
    if (!option) {
      setAvailableDestinations([]);
      return;
    }
    const destIds = new Set(busRoutes[option.value]?.map(String));
    const filteredDests = cities.filter((city) =>
      destIds.has(city.value.toString())
    );
    setAvailableDestinations(filteredDests);
    setSelectedTo(null);
  };

  const handleSelectTo = (option) => {
    setSelectedTo(option);
    setAvailableBus([]);
  };

  const handleSelectDate = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    fetchBusList();
    fetchCities();
  }, []);

  return (
    <Container className="my-5">
      <h4 className="mb-4">Plan your travel</h4>

      <div className="p-4 border rounded shadow-sm bg-light">
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Label>From</Form.Label>
            <Select
              options={cities}
              placeholder="Select City"
              value={selectedFrom}
              onChange={handleSelectFrom}
              isClearable
            />
          </Col>

          <Col md={4}>
            <Form.Label>To</Form.Label>
            <Select
              options={availableDestinations}
              placeholder="Select Destination"
              value={selectedTo}
              onChange={handleSelectTo}
              isClearable
              isDisabled={!selectedFrom}
            />
          </Col>

          <Col md={3}>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" onChange={handleSelectDate} />
          </Col>

          <Col md={1} className="d-grid">
            <Button variant="primary" onClick={handleSearchBus}>
              🔍
            </Button>
          </Col>
        </Row>
      </div>

      <div className="mt-4">
        {someError && <p className="text-danger">{someError}</p>}
        {searchLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: 150 }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) :  availableBus.length === 0 ? (
          <EmptySectionWallpaper />
        ) : (
          <BusOptions options={availableBus} />
        )}
      </div>

      <Outlet />
    </Container>
  );
};

export default Buses;
