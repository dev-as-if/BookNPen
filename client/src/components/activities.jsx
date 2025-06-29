import React, { useState } from "react";
import JsonData from "../data/data.json";
import "../components/activities.css";

const Activities = () => {
    const data = JsonData.Activities;
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="activities-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h4 className="section-heading text-uppercase text-black">Activities</h4>
                    <h2 className="section-title">Encouraging Participation & All-Round Growth</h2>
                    <p className="lead">{data.intro}</p>
                </div>

                <ul className="nav nav-tabs justify-content-center mb-4" role="tablist">
                    {data.categories.map((cat, index) => (
                        <li className="nav-item" role="presentation" key={index}>
                            <button
                                className={`nav-link ${activeTab === index ? "active" : ""}`}
                                onClick={() => setActiveTab(index)}
                                role="tab"
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="tab-content mt-4">
                    <ul className="list-group">
                        {data.categories[activeTab].items.map((item, i) => (
                            <li className="list-group-item" key={i}>
                                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        </section>
    );
};

export default Activities;
