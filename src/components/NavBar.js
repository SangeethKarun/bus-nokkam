import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        Bus nokkam
      </Link>
      
      <div className="" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/buses">
              Buses
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/bookings">
              Bookings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
