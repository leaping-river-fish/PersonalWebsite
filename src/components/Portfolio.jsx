import React from 'react'; 
import Gallery from './Gallery';  
import './css/portfolio.css'; 

function Portfolio() {
  return (
    <div>
      <div className="portfolio-container">
        <h1>My Portfolio</h1>
        
        {/* Portfolio Sections */}
        <section className="portfolio-gallery">
          <Gallery /> 
        </section>
      </div>
    </div>
  );
}

export default Portfolio;
