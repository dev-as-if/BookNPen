import React from "react";
import admissionData from "../data/data.json";
import "../components/admission.css";

const Admissions = () => {
  const { title, subtitle, intro, sections, closingQuote } = admissionData.AdmissionDetails;

  return (
    <div className="admissions-container">
      {/* Header */}
      <div className="admissions-header text-center">
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">{subtitle}</h2>
        <p className="intro">{intro}</p>
      </div>

      {/* Admission Sections */}
      {sections.map((section, index) => (
        <div key={index} className="admissions-section">
          <h3 className="section-heading text-black">{section.heading}</h3>

          {section.points.map((point, idx) => (
            <div key={idx} className="admissions-point">
              <h4 className="point-title">{point.title}</h4>
              <ul className="point-details">
                {point.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {/* Closing Quote */}
      <div className="admissions-quote text-center">
        <blockquote>“{closingQuote}”</blockquote>
      </div>
    </div>
  );
};

export default Admissions;
