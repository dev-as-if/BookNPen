import React from "react";
import JsonData from "../data/data.json";
import "../components/facilities.css";

const Facilities = () => {
  const data = JsonData.Facilities;

  return (
    <section className="facilities-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h4 className="section-heading text-uppercase">Facilities</h4>
          <h2 className="section-title text-black">Empowering Environment for Holistic Development</h2>
          <p className="lead text-black">{data.intro}</p>
        </div>

        <div className="accordion" id="facilitiesAccordion">
          {data.categories.map((category, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  {category.name}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#facilitiesAccordion"
              >
                <div className="accordion-body">
                  <ul className="list-unstyled ms-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
