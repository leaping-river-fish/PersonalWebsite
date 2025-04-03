import React from "react";
import { useEffect, useState } from "react";
import "./css/home.css";


const Home = () => {

  const phrases = [
    "Nick Zheng",
    "a Student at the University of Waterloo",
    "a Systems Design Engineer",
    "a Passionate Gamer",
    "a Dragon Enthusiast",
    "a Lifelong Learner"
  ];

  const quotes = [
    "'Train like you've never won, play like you've never lost'",
    "'If we keep holding onto yesterday, what will we be tomorrow?'",
    "'Even the best would fail if they kept doing the same thing'",
  ];

  const [currentPhrase, setCurrentPhrase] = useState([0]);
  const [currentQuote, setCurrentQuote] = useState([0]);
  const [indexP, setIndexP] = useState(0);
  const [indexQ, setIndexQ] = useState(0);

  useEffect (() => {
    const intervalPhrase = setInterval(() => {
      setIndexP((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 6000);

    return () => clearInterval(intervalPhrase);
  }, []);

  useEffect (() => {
    const intervalQuote = setInterval(() => {
      setIndexQ((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(intervalQuote)
  }, []);

  useEffect (() => {
    setCurrentPhrase(phrases[indexP]);
  }, [indexP]);

  useEffect (() => {
    setCurrentQuote(quotes[indexQ]);
  }, [indexQ]);
  

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
            <div className="home-quote">
            <p className="quote">
              {currentQuote}
            </p>
          </div>
          </div>
        </div>
      </div>
  );
};


export default Home;