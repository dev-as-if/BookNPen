import React from "react";
import JsonData from "../data/data.json";
// import Footer from "./footer";

const About = () => {
  const about = JsonData.About;

  return (
    <section id="about" className="about-section">
      <div className="overlay"></div>
      <div className="container text-center content">
        <h4 className="section-heading text-black">{about.heading}</h4>
        <h2 className="section-title">{about.title}</h2>
        {about.paragraphs.map((para, i) => (
          <p key={i} className="about-paragraph">
            {para}
          </p>
        ))}
      </div>
    </section>
    
  );
};

export default About;

