import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import "./components/css/global.css";
import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact"
import Portfolio from "./components/Portfolio";
import Projects from "./components/Projects"
import { ImageProvider } from './ImageContext';
import GridTransition from "./GridTransition";
import './App.css'

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setTransitioning(false); 
    setContentVisible(true);
  }, [location]);

  const handleNavigate = (e, path) => {
    e.preventDefault();  

    if (path !== location.pathname) {
      setTransitioning(true);
      setContentVisible(false);
      setTargetPath(path);
    }
  };

  const handleTransitionComplete = () => {
    setTransitioning(false);
    setContentVisible(true);
    navigate(targetPath); 
  };

  // Keeps text in buttons white when clicked ---------------------------------
  useEffect(() => {
    
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

    };
  }, []);
  // ---------------------------------------------------------------------------

  return (
    <>
      <ImageProvider>
        <Navbar onNavigate={handleNavigate} />
        <GridTransition trigger={transitioning} onComplete={handleTransitionComplete} />
        <div style={{ display: contentVisible ? "block" : "none" }}>
          <Routes key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </ImageProvider>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
