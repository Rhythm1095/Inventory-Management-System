import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'aqua' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Inventory Management System</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/features">Features</Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link to="/login">
              <button className="btn btn-outline-primary me-2" type="button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-outline-primary me-2" type="button">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
