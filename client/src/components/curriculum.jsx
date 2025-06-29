import React, { useState } from "react";
import JsonData from "../data/data.json";
import "../components/curriculum.css";

import {
  FaBookOpen,
  FaUserGraduate,
  FaPaintBrush,
  FaHandsHelping,
  FaChartLine,
} from "react-icons/fa";

const icons = {
  "Academic Subjects": <FaBookOpen size={28} />,
  "Holistic Development": <FaUserGraduate size={28} />,
  "Creative & Co-curricular Activities": <FaPaintBrush size={28} />,
  "Special Initiatives": <FaHandsHelping size={28} />,
  "Assessment & Progress": <FaChartLine size={28} />,
};

const Curriculum = () => {
  const curriculum = JsonData.Curriculum;
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (key) => {
    setActiveSection(activeSection === key ? null : key);
  };

  return (
    <section className="curriculum-section py-5">
      <div className="container text-center">
        <h4 className="section-heading text-black">Our Curriculum</h4>
        <h2 className="section-title">{curriculum.title}</h2>
        <p className="intro-text mb-5">{curriculum.intro}</p>

        <div className="row">
          {Object.entries(curriculum.sections).map(([key, section], index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div
                className={`curriculum-card ${activeSection === key ? "active" : ""}`}
                onClick={() => toggleSection(key)}
              >
                <div className="card-icon">{icons[key]}</div>
                <h5 className="card-title">{key}</h5>
                {activeSection === key && (
                  <div className="card-content text-start mt-3">
                    {Object.entries(section).map(([subKey, items], idx) => (
                      <div key={idx} className="mb-3">
                        <h6 className="fw-bold">{subKey}</h6>
                        <ul className="list-unstyled ms-3">
                          {items.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <br /><br /><br /><br />
      </div>
    </section>
  );
};

export default Curriculum;
