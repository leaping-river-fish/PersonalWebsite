import React from 'react';
import './css/lightbox.css'; 

function Lightbox({ imageSrc, closeLightbox, prevImage, nextImage }) {
  
  return (
    <div className="lightbox" onClick={closeLightbox}>
      <img id="lightbox-img" src={imageSrc} alt="Expanded Image" />
     
    </div>
  );
}

export default Lightbox;

