import React, { useState, useRef, useEffect } from "react"; // TO DO: FIX ISSUE WITH INDEX AND FIRST IMAGE IN CAROUSEL
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";
import "./css/gallery.css";

const images = [
  { src: "/images/FlipGive.png", alt: "Fundraising 1", category: "Fundraising" },
  { src: "/images/Flipgive Post (1).png", alt: "Fundraising 2", category: "Fundraising" },
  { src: "/images/FlipGive Post.png", alt: "Fundraising 3", category: "Fundraising" },
  { src: "/images/Deadly Grounds Post.png", alt: "Fundraising 4", category: "Fundraising" },
  { src: "/images/Williams Music Popcorn Sale.png", alt: "Fundraising 5", category: "Fundraising" },
  { src: "/images/Williams Music Merch.png", alt: "Fundraising 6", category: "Fundraising" },
  { src: "/images/Holiday Wish.png", alt: "Fundraising 7", category: "Fundraising" },
  { src: "/images/Valentine Serenades.png", alt: "Fundraising 8", category: "Fundraising" },
  { src: "/images/Friday, December 16th  315 - 445pm (1).png", alt: "Event Advertising 1", category: "Event Advertising" },
  { src: "/images/Have a Great (1).png", alt: "Event Advertising 2", category: "Event Advertising" },
  { src: "/images/One Chip Challenge.png", alt: "Event Advertising 3", category: "Event Advertising" },
  { src: "/images/Serenades Post (1).png", alt: "Event Advertising 4", category: "Event Advertising" },
  { src: "/images/Williams Music (1).png", alt: "Event Advertising 5", category: "Event Advertising" },
  { src: "/images/I'm dreaming of a.png", alt: "Event Advertising 6", category: "Event Advertising" },
  { src: "/images/Comfy Cozy Day.png", alt: "Event Advertising 7", category: "Event Advertising" },
  { src: "/images/music.png", alt: "Event Advertising 8", category: "Event Advertising" },
  { src: "/images/Sports Day.png", alt: "Event Advertising 9", category: "Event Advertising" },
  { src: "/images/Spring.png", alt: "Event Advertising 10", category: "Event Advertising" },
  { src: "/images/Williams Dekpor Shoe Drive.png", alt: "Event Advertising 11", category: "Event Advertising" },
  { src: "/images/Food.png", alt: "Event Advertising 12", category: "Event Advertising" },
  { src: "/images/Williams Open Mic.png", alt: "Event Advertising 13", category: "Event Advertising" },
  { src: "/images/Omar Thomas Post.png", alt: "Event Advertising 14", category: "Event Advertising" },
  { src: "/images/Water Dragon.png", alt: "Art 1", category: "Art" },
  { src: "/images/Power Dragon.png", alt: "Art 2", category: "Art" },
  { src: "/images/Steel Dragon.png", alt: "Art 3", category: "Art" },
  { src: "/images/Dawn Dragon.png", alt: "Art 4", category: "Art" },
  { src: "/images/Dusk Dragon.png", alt: "Art 5", category: "Art" },
  { src: "/images/Lunar Dragon.png", alt: "Art 6", category: "Art" },
  { src: "/images/Fire Dragon.png", alt: "Art 7", category: "Art" },
  { src: "/images/Flora Dragon.png", alt: "Art 8", category: "Art" },
  { src: "/images/Stone Dragon.png", alt: "Art 9", category: "Art" },
  { src: "/images/Ice Dragon.png", alt: "Art 10", category: "Art" },
  { src: "/images/Wind Dragon.png", alt: "Art 11", category: "Art" },
];

const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const zoomRef = useRef(null);

  const openLightbox = (index) => {
    console.log(`Opening lightbox with image at index: ${index}`);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsLightboxOpen(true);
  }, 0);
};

  const closeLightbox = () => setIsLightboxOpen(false);

  const fundraisingImages = images.filter(img => img.category === "Fundraising");
  const eventImages = images.filter(img => img.category === "Event Advertising");
  const artImages = images.filter(img => img.category === "Art");

  const renderGallery = (title, imageList) => (
    <div>
      <h2>{title}</h2>
      <Masonry breakpointCols={{ default: 3, 768: 2, 500: 1 }} className="masonry-grid" columnClassName="masonry-column">
        {imageList.map((img, index) => (
          <div key={index} className="masonry-item" onClick={() => openLightbox(index)}>
            <img src={img.src} alt={img.alt} className="masonry-image" loading="lazy" />
          </div>
        ))}
      </Masonry>
    </div>
  );

  useEffect(() => {
    console.log(`Lightbox updated to image at index: ${currentImageIndex}`);
  }, [currentImageIndex]);

  return (
    <div className="gallery-container">
      {renderGallery("Fundraising", fundraisingImages)}
      {renderGallery("Event Advertising", eventImages)}
      {renderGallery("Art", artImages)}

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          key={currentImageIndex}
          open={isLightboxOpen}
          close={closeLightbox}
          zoom={{ ref: zoomRef }}
          slides={images.map((img) => ({
            src: img.src,
            title: img.alt,
            description: img.alt,
          }))}
          currentIndex={currentImageIndex}
          plugins={[Zoom, Captions, Download, Share]}
        />
      )}
    </div>
  );
};

export default Gallery;