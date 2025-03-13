import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "./Lightbox";
import "./css/gallery.css";

const images = [
  { src: "/images/FlipGive.png", alt: "Fundraising 1" },
  { src: "/images/Flipgive Post (1).png", alt: "Fundraising 2" },
  { src: "/images/FlipGive Post.png", alt: "Fundraising 3" },
  { src: "/images/Deadly Grounds Post.png", alt: "Fundraising 4" },
  { src: "/images/Williams Music Popcorn Sale.png", alt: "Fundraising 5" },
  { src: "/images/Williams Music Merch.png", alt: "Fundraising 6" },
  { src: "/images/Holiday Wish.png", alt: "Fundraising 7" },
  { src: "/images/Valentine Serenades.png", alt: "Fundraising 8" },
  { src: "/images/Friday, December 16th  315 - 445pm (1).png", alt: "Event Advertising 1" },
  { src: "/images/Have a Great (1).png", alt: "Event Advertising 2" },
  { src: "/images/One Chip Challenge.png", alt: "Event Advertising 3" },
  { src: "/images/Serenades Post (1).png", alt: "Event Advertising 4" },
  { src: "/images/Williams Music (1).png", alt: "Event Advertising 5" },
  { src: "/images/I'm dreaming of a.png", alt: "Event Advertising 6" },
  { src: "/images/Comfy Cozy Day.png", alt: "Event Advertising 7" },
  { src: "/images/music.png", alt: "Event Advertising 8" },
  { src: "/images/Sports Day.png", alt: "Event Advertising 9" },
  { src: "/images/Spring.png", alt: "Event Advertising 10" },
  { src: "/images/Williams Dekpor Shoe Drive.png", alt: "Event Advertising 11" },
  { src: "/images/Food.png", alt: "Event Advertising 12" },
  { src: "/images/Williams Open Mic.png", alt: "Event Advertising 13" },
  { src: "/images/Omar Thomas Post.png", alt: "Event Advertising 14" },
  { src: "/images/Water Dragon.png", alt: "Art 1" },
  { src: "/images/Power Dragon.png", alt: "Art 2" },
  { src: "/images/Steel Dragon.png", alt: "Art 3" },
  { src: "/images/Dawn Dragon.png", alt: "Art 4" },
  { src: "/images/Dusk Dragon.png", alt: "Art 5" },
  { src: "/images/Lunar Dragon.png", alt: "Art 6" },
  { src: "/images/Fire Dragon.png", alt: "Art 7" },
  { src: "/images/Flora Dragon.png", alt: "Art 8" },
  { src: "/images/Stone Dragon.png", alt: "Art 9" },
  { src: "/images/Ice Dragon.png", alt: "Art 10" },
  { src: "/images/Wind Dragon.png", alt: "Art 11" },
];

const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <div className="gallery-container">
      <h2>My Portfolio</h2>
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 768: 2, 500: 1 }} // Responsive
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {images.map((image, index) => (
          <div key={index} className="masonry-item" onClick={() => openLightbox(image.src)}>
            <img src={image.src} alt={image.alt} loading="lazy" className="masonry-image" />
          </div>
        ))}
      </Masonry>
      {isLightboxOpen && <Lightbox imageSrc={lightboxImage} closeLightbox={closeLightbox} />}
    </div>
  );
};

export default Gallery;