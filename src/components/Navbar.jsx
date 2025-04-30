import React from "react";
import { Link } from "react-router-dom";
import "./css/navbar.css";

function Navbar({ onNavigate }) {

    return (
        <nav>
          <div className="logo">
            <img src="/logo2.png" alt="Website Logo" />
          </div>
          <ul className="highlight-btn">
            <Link to="/" onClick={(e) => onNavigate(e, "/")}>Home</Link>
          </ul>
          <ul className="highlight-btn">
            <Link to="/about" onClick={(e) => onNavigate(e, "/about")}>About</Link>
          </ul>
          <ul className="highlight-btn">
            <Link to="/projects" onClick={(e) => onNavigate(e, "/projects")}>Projects</Link>
          </ul>
          <ul className="highlight-btn">
            <Link to="/portfolio" onClick={(e) => onNavigate(e, "/portfolio")}>Portfolio</Link>
          </ul>
          <ul className="contact-btn">
            <Link to="/contact" onClick={(e) => onNavigate(e, "/contact")}>Contact</Link>
          </ul>
        </nav>

    );
};

export default Navbar;
