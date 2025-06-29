import React from "react";
import JsonData from "../data/data.json";

const Vision = () => {
  const vision = JsonData.Vision;

  return (
    <section id="about" className="about-section">
      <div className="overlay"></div>
      <div className="container text-center content">
        <h4 className="section-heading text-black">{vision.heading}</h4>
        <h2 className="section-title">{vision.title}</h2>
        {vision.paragraphs.map((para, i) => (
          <p key={i} className="about-paragraph">
            {para}
          </p>
        ))}
        <h3 className="text-text-uppercase">{vision.highlight}</h3>
      </div>
    </section>
  );
};

export default Vision;