import React from "react";
import { Link } from "react-router-dom";
import "./css/navbar.css";

const Navbar = () => {

    return (
        <nav>
          <div className="logo">
            <img src="/logo2.png" alt="Website Logo" />
          </div>
          <ul className="highlight-btn">
            <Link to="/">Home</Link>
          </ul>
          <ul className="highlight-btn">
            <Link to="/about">About</Link>
          </ul>
          <ul className="highlight-btn">
            <Link to="/projects">Projects</Link>
          </ul>
          <ul className="highlight-btn">
            <Link to="/portfolio">Portfolio</Link>
          </ul>
          <ul className="contact-btn">
            <Link to="/contact">Contact</Link>
          </ul>
        </nav>

    );
};

export default Navbar;
