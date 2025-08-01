import { Button, Dropdown, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BusOptions from "../components/BusOptions";

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
    } catch (err) {}
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://assets.onlineksrtcswift.com/api/resource/getStaticCityList"
      );
      const result = await response.json();
      const cities = Object.entries(result.data).map(([id, name]) => ({
        id,
        name,
      }));
      setCities(cities);
    } catch (err) {}
  };

  const handleSearchBus = async () => {
    try {
      setSearchLoading(true);
      setSomeError(null);
      const apiLink = `https://onlineksrtcswift.com/api/resource/searchRoutesV4?fromCityID=${selectedFrom.id}&toCityID=${selectedTo.id}&journeyDate=${selectedDate}&mode=oneway`;
      const response = await fetch(apiLink);
      const result = await response.json();
      setAvailableBus(result);
      console.log(result);
    } catch (err) {
      setSomeError(err.message);
      setAvailableBus([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectFrom = (eventKey) => {
    const city = cities.find((c) => c.id.toString() === eventKey);
    setSelectedFrom(city);
    setAvailableBus([]);
    const availableDestinationsIdsSet = new Set(busRoutes[city.id].map(String));
    const availableDestinations = cities.filter((city) =>
      availableDestinationsIdsSet.has(city.id.toString())
    );
    setAvailableDestinations(availableDestinations);
  };

  const handleSelectTo = (eventKey) => {
    const city = cities.find((c) => c.id.toString() === eventKey);
    setSelectedTo(city);
    setAvailableBus([]);
  };

  const handleSelectDate = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    fetchBusList();
    fetchCities();
    setSomeError(null);
  }, []);

  return (
    <div className="m-5">
      <h4>Plan your travel</h4>

      <div className="d-flex flex-wrap align-items-center justify-content-start gap-3 p-3 border rounded shadow-sm bg-light">
        <div>
          <label className="form-label mb-1">From</label>
          <Dropdown onSelect={handleSelectFrom}>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-from">
              {selectedFrom?.name ?? "Select City"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {cities.map((item, index) => (
                <Dropdown.Item key={index} eventKey={item.id.toString()}>
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div>
          <label className="form-label mb-1">To</label>
          <Dropdown onSelect={handleSelectTo}>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-to">
              {selectedTo?.name ?? "Select Destination"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {availableDestinations.map((item, index) => (
                <Dropdown.Item key={index} eventKey={item.id.toString()}>
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div>
          <label className="form-label mb-1">Date</label>
          <Form.Control type="date" onChange={handleSelectDate} />
        </div>

        <div className="align-self-end">
          <Button variant="primary" onClick={handleSearchBus}>
            🔍 Search Bus
          </Button>
        </div>
      </div>
      {someError && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 100 }}
        >
          <p className="text-danger">{someError}</p>
        </div>
      )}

      {searchLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 100 }}
        >
          <progress />
        </div>
      ) : (
        <BusOptions options={availableBus} />
      )}

      <Outlet />
    </div>
  );
};

export default Buses;
