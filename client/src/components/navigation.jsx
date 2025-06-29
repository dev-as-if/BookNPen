import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/BPPS.jpg";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-default" id="menu">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <img src={Logo} alt="BPPS Logo" height="60" className="me-2" />
          <div>
            Book & Pen <br /> Public School
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Home
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/about">About Us</Link></li>
                <li><Link className="dropdown-item" to="/mission">Mission</Link></li>
                <li><Link className="dropdown-item" to="/vision">Vision</Link></li>
                <li><Link className="dropdown-item" to="/core-values">Core Values</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Academics
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/curriculum">Curriculum</Link></li>
                <li><Link className="dropdown-item" to="/methodology">Methodology</Link></li>
                <li><Link className="dropdown-item" to="/assessment">Assessment</Link></li>
              </ul>
            </li>

            <li className="nav-item"><Link className="nav-link" to="/facilities">Facilities</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admissions">Admissions</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/careers">Careers</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/portfolio">Gallery</Link></li>
            <li className="donate nav-item"><Link className="nav-link" to="/erp-login">ERP</Link></li> &nbsp;
            <li className="donate nav-item"><Link className="nav-link" to="/donate">Donate</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;