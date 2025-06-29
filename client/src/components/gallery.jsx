import React, { useState } from "react";

const Gallery = ({ data }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev < data.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : data.length - 1
    );
  };

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
            Take a look at our gallery to see the amazing moments captured during our events and activities. We believe in creating memories that last a lifetime, and our gallery showcases the vibrant spirit of our community.
          </p>
        </div>
        <div className="row portfolio-items">
          {data ? (
            data.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="col-sm-6 col-md-4 col-lg-4 portfolio-item"
                onClick={() => handleImageClick(i)}
              >
                <div className="hover-bg">
                  <img
                    src={`${process.env.PUBLIC_URL}/${item.largeImage}`}
                    alt={item.title}
                    className="img-fluid gallery-thumb"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {selectedImageIndex !== null && (
          <div className="lightbox-overlay" onClick={handleCloseModal}>
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`${process.env.PUBLIC_URL}/${data[selectedImageIndex].largeImage}`}
                alt={data[selectedImageIndex].title}
                className="lightbox-image"
              />
              <button className="lightbox-close" onClick={handleCloseModal}>
                &times;
              </button>
              <button className="lightbox-prev" onClick={handlePrev}>
                &#10094;
              </button>
              <button className="lightbox-next" onClick={handleNext}>
                &#10095;
              </button>
              <div className="lightbox-caption">
                {data[selectedImageIndex].title}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
