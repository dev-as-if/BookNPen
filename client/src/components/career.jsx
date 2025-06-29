import React from "react";
import careerData from "../data/data.json";
import "../components/career.css"; // Create this file for styling

const Career = () => {
  const { title, intro, sections, closingNote } = careerData.CareerDetails;

  return (
    <div className="career-container">
      <div className="career-header text-center">
        <h1 className="career-title">{title}</h1>
        <p className="career-intro">{intro}</p>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="career-section">
          <h2 className="section-heading">{section.heading}</h2>
          {section.description && <p className="section-description">{section.description}</p>}

          {section.subsections && section.subsections.map((sub, subIndex) => (
            <div key={subIndex} className="career-subsection">
              <h4 className="subsection-title">{sub.title}</h4>
              <ul className="subsection-items">
                {sub.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {section.contacts && (
            <div className="career-contact">
              <p><strong>Email:</strong> {section.contacts.email}</p>
              <p><strong>Address:</strong> {section.contacts.address}</p>
              <p><em>{section.contacts.note}</em></p>
            </div>
          )}

          {section.items && (
            <ul className="section-items">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="career-closing-note text-center">
        <blockquote>{closingNote}</blockquote>
      </div>
    </div>
  );
};

export default Career;
