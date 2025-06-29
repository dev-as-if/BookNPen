import React from "react";
import JsonData from "../data/data.json";
import "../components/assessment.css";

const Assessment = () => {
  const { intro, features, quote } = JsonData.Assessment;

  return (
    <section className="assessment-section">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h4 className="section-heading text-uppercase text-black">Assessment</h4>
          <h2 className="section-title text-white">Our Approach to Student Evaluation</h2>
          <p className="section-intro">{intro}</p>
        </div>

        <div className="timeline">
          {features.map((feature, index) => (
            <div
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              key={index}
            >
              <div className="timeline-content shadow-sm">
                <h5 className="feature-title">{feature.title}</h5>
                <p className="feature-desc">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="quote-box mt-5 text-center">
          <blockquote>{quote}</blockquote>
        </div>
      </div>
    </section>
  );
};

export default Assessment;
