import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/home.css";


const Home = () => {
  useEffect(() => {
    document.querySelectorAll('.contact-btn').forEach(button => {
      button.addEventListener('click', function() {
        this.blur(); 
      });
    });
  }, []);
  return (
      <div className="home-container">
        {/* Intro Section */}
        <div className="intro">
          <div className="text">
            <p>Hello,</p>
            <h1>
              I'm <span>Nick Zheng</span>
            </h1>
            <p>I am a Systems Design Engineer student at the University of Waterloo</p>
          </div>
        </div>
      </div>
  );
};


export default Home;