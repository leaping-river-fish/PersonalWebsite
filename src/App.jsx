import { useState } from 'react'
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./components/css/global.css";
import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact"
import Portfolio from "./components/Portfolio";
import { ImageProvider } from './ImageContext';
import './App.css'

function App() {

  // Keeps text in buttons white when clicked ---------------------------------
  useEffect(() => {
    
    // const handleBlur = (event) => {
    //   setTimeout(() => {
    //     event.target.blur();
    //   }, 50);
    // };
    const buttons = document.querySelectorAll("button, .contact-btn, a");

    
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        setTimeout(() => {
          button.blur(); 
        }, 50);
      });
    });

    
      return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", () => button.blur());
      });
    // buttons.forEach((button) => button.addEventListener("click", handleBlur));

    // return () => {
    //   buttons.forEach((button) => button.removeEventListener("click", handleBlur));

    };
  }, []);
  // ---------------------------------------------------------------------------

  return (
    <Router>
      <ImageProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
       </ImageProvider>
     </Router>
  )
}

export default App
