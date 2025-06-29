import React from "react";
import JsonData from "../data/data.json";

const Mission = () => {
  const mission = JsonData.Mission;

  return (
    <section id="about" className="about-section">
      <div className="overlay"></div>
      <div className="container text-center content">
        <h4 className="section-heading  text-black">{mission.heading}</h4>
        <h2 className="section-title">{mission.title}</h2>
        {mission.paragraphs.map((para, i) => (
          <p key={i} className="about-paragraph">
            {para}
          </p>
        ))}
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </section>
  );
};

export default Mission;