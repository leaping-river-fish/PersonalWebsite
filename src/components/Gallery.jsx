import React, { useState, useRef, useEffect, useMemo } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";
import { useImageContext } from '../ImageContext.jsx';
import "./css/gallery.css";

const SkeletonLoader = () => (
  <div className="skeleton">
    <div className="skeleton-img"></div>
  </div>
);

const Gallery = () => {
  const { fundraisingImages, eventImages, artImages, isLoading } = useImageContext();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const zoomRef = useRef(null);

  const openLightbox = (clickedImageSrc) => {
    const allImages = [...fundraisingImages, ...eventImages, ...artImages];
    const globalIndex = allImages.findIndex(img => img.src === clickedImageSrc);
    console.log('Clicked image source:', clickedImageSrc, 'Found at index:', globalIndex);
    if (globalIndex !== -1) {
      setCurrentImageIndex(globalIndex);
      setIsLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setCurrentImageIndex(null);
  };

  const slides = useMemo(() => {
    return [...fundraisingImages, ...eventImages, ...artImages].map((img) => ({
      src: img.src,
      title: img.alt,
      description: img.alt,
    }));
  }, [fundraisingImages, eventImages, artImages]);

  const renderGallery = (title, imageList) => (
    <div className="gallery-section">
      <h2>{title}</h2>
      {isLoading ? (
        <div className="masonry-grid">
          {[...Array(9)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <Masonry breakpointCols={{ default: 3, 768: 2, 500: 1 }} className="masonry-grid" columnClassName="masonry-column">
        {imageList.map((img) => (
          <div key={img.public_id || img.src} className="masonry-item" onClick={() => openLightbox(img.src)}>
            <img src={img.src} alt={img.alt} className="masonry-image" loading="lazy" />
          </div>
        ))}
        </Masonry>
      )}
    </div>
  );

  return (
    <div className="gallery-container">
      {isLoading && <div className="loading-spinner"></div>}
      {renderGallery("Fundraising", fundraisingImages)}
      {renderGallery("Event Advertising", eventImages)}
      {renderGallery("Art", artImages)}

      {/* Lightbox */}
      {isLightboxOpen && currentImageIndex !== null && (
        <Lightbox
          key={currentImageIndex}
          open={isLightboxOpen}
          close={closeLightbox}
          zoom={{ ref: zoomRef }}
          slides={slides}
          index={currentImageIndex}
          plugins={[Zoom, Captions, Download, Share]}
        />
      )}
    </div>
  );
};

export default Gallery;