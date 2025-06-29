import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Placement = ({ data }) => {
  if (!data || !Array.isArray(data)) return null; // Add this defensive check

  return (
    <div className="text-center">
      <div className="section-title">
        <h2>Our Recruiters & Trainers</h2>
      </div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Carousel
          autoPlay
          infiniteLoop
          interval={2000}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
        >
          {data.map((item, index) => (
            <div key={index}>
              <img
                src={item.img}
                alt={`Recruiter ${index + 1}`}
                style={{ height: "300px", objectFit: "contain" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Placement;