// import React from "react";
// import JsonData from "../data/data.json";
// import "../components/core_values.css"; // Assuming you have a CSS file for styling

// const CoreValues = () => {
//   const data = JsonData["Core-Values"];

//   return (
//     <section id="about" className="about-section">
//       <div className="overlay"></div>
//       <div className="container content">
//         <h4 className="section-heading text-center">{data.heading}</h4>
//         <h2 className="section-title text-center">{data.title}</h2>

//         <div className="row justify-content-center">
//           <div className="col-md-10 offset-md-1">
//             <ul className="custom-list">
//               {data.values.map((value, index) => (
//                 <li key={index}>{value}</li>
//               ))}
//             </ul>

//             <h5 className="mt-4">{data.commitment.title}</h5>
//             <ul className="custom-list">
//               {data.commitment.weProvide.map((item, idx) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>

//             <p className="highlight-text mt-4">
//               <strong>{data.commitment.highlight}</strong>
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CoreValues;


import React from "react";
import JsonData from "../data/data.json";
import "../components/core_values.css";

const CoreValues = () => {
  const data = JsonData["Core-Values"];

  return (
    <section id="core-values" className="core-values-section">
      <div className="core-values-overlay"></div>
      <div className="container core-values-content">
        <h4 className="core-values-heading text-center text-black">{data.heading}</h4>
        <h2 className="core-values-title text-center text-white">{data.title}</h2>

        <div className="row justify-content-center">
          <div className="col-md-10 offset-md-1">
            <ul className="core-values-list">
              {data.values.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>

            <h5 className="mt-4">{data.commitment.title}</h5>
            <ul className="core-values-list">
              {data.commitment.weProvide.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <p className="core-values-highlight mt-4">
              <strong>{data.commitment.highlight}</strong>
            </p>
          </div>
        </div>
        <br /><br /><br /><br />
      </div>
    </section>
  );
};

export default CoreValues;
