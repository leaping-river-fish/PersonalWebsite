import React from "react";
import { useEffect, useState } from "react";
import "./css/home.css";


const Home = () => {

  const phrases = [
    "Nick Zheng",
    "a Systems Design Engineer",
    "a Passionate Gamer",
    "a Dragon Enthusiast",
    "a Lifelong Learner"
  ];

  const [currentPhrase, setCurrentPhrase] = useState([0]);
  const [index, setIndex] = useState(0);

  useEffect (() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect (() => {
    setCurrentPhrase(phrases[index]);
  }, [index]);

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
        <div className="home-intro">
          <div className="home-text">
            <p className="home-greeting">Hello,</p>
            <h1>
              I'm <span>{currentPhrase}</span>
            </h1>
            <p className="home-greeting">I am a Systems Design Engineer student at the University of Waterloo</p>
          </div> {/*Train like you've never won, play like you've never lost*/}
        </div>
      </div>
  );
};


export default Home;