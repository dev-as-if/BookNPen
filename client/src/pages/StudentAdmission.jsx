// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { getToken } from "../utils/auth";
// import Confetti from "react-confetti";
// import { useNavigate } from "react-router-dom";

// const StudentAdmission = () => {
//   const [data, setData] = useState({
//     rollNumber: "",
//     name: "",
//     fatherName: "",
//     dob: "",
//     age: "",
//     address: "",
//     class: "",
//   });
//   const [suggestions, setSuggestions] = useState([]);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const navigate = useNavigate();
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     if (data.rollNumber) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(fetchSuggestions, 300);
//     } else {
//       setSuggestions([]);
//     }
//   }, [data.rollNumber]);

//   const fetchSuggestions = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/operator/roll-suggestions?q=${data.rollNumber}`,
//         { headers: { Authorization: `Bearer ${getToken()}` } }
//       );
//       setSuggestions(res.data);
//     } catch {
//       setSuggestions([]);
//     }
//   };

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const generateRoll = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/operator/roll-suggestions?q=", {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       const maxRoll = Math.max(...res.data.map(Number), 100000);
//       setData({ ...data, rollNumber: String(maxRoll + 1) });
//       setSuggestions([]);
//     } catch {
//       alert("Error generating roll number");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/operator/add-student", data, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       setShowConfetti(true);
//       setTimeout(() => {
//         setShowConfetti(false);
//         navigate("/operator-dashboard");
//       }, 3000);
//     } catch {
//       alert("Error adding student");
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "600px" }}>
//       {showConfetti && <Confetti />}
//       <h3 className="mb-4">New Student Admission</h3>
//       <div className="mb-3 d-flex gap-2">
//         <input
//           type="text"
//           name="rollNumber"
//           className="form-control"
//           placeholder="Roll Number (Enter or generate)"
//           value={data.rollNumber}
//           onChange={handleChange}
//         />
//         <button className="btn btn-secondary" onClick={generateRoll}>
//           Generate
//         </button>
//       </div>
//       {suggestions.length > 0 && (
//         <ul className="list-group mb-3">
//           {suggestions.map(r => (
//             <li
//               key={r}
//               className="list-group-item list-group-item-action"
//               onClick={() => setData({ ...data, rollNumber: String(r) })}>
//               {r}
//             </li>
//           ))}
//         </ul>
//       )}
//       <form onSubmit={handleSubmit}>
//         {["name", "fatherName", "dob", "age", "address", "class"].map(field => (
//           <input
//             key={field}
//             type={field === "dob" ? "date" : "text"}
//             name={field}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             value={data[field]}
//             onChange={handleChange}
//             className="form-control mb-2"
//             required
//           />
//         ))}
//         <button type="submit" className="btn btn-success w-100">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentAdmission;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const StudentAdmission = () => {
  const [data, setData] = useState({
    rollNumber: "",
    name: "",
    fatherName: "",
    dob: "",
    age: "",
    address: "",
    class: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const classOptions = [
    "Nursery", "KG", "Prep", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
  ];

  useEffect(() => {
    if (data.rollNumber) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(fetchSuggestions, 300);
    } else {
      setSuggestions([]);
    }
  }, [data.rollNumber]);

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/operator/roll-suggestions?q=${data.rollNumber}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setSuggestions(res.data);
    } catch {
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const generateRoll = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/operator/roll-suggestions?q=", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const maxRoll = Math.max(...res.data.map(Number), 100000);
      setData({ ...data, rollNumber: String(maxRoll + 1) });
      setSuggestions([]);
    } catch {
      alert("Error generating roll number");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/operator/admit-student", data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        navigate("/operator-dashboard");
      }, 3000);
    } catch {
      alert("Error adding student");
    }
  };

  return (
    <div>
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        {showConfetti && <Confetti />}
         <button className="btn btn-outline-secondary mb-3" onClick={() => navigate("/operator-dashboard")}>
        <FaArrowLeft className="me-1" /> Back to Dashboard
      </button>
        <h3 className="mb-4">New Student Admission</h3>

        {/* Roll number input & generate */}
        <div className="mb-3 d-flex gap-2">
          <input
            type="text"
            name="rollNumber"
            className="form-control"
            placeholder="Roll Number (Enter or generate)"
            value={data.rollNumber}
            onChange={handleChange}
          />
          <button className="btn btn-secondary" type="button" onClick={generateRoll}>
            Generate
          </button>
        </div>

        {/* Suggestions list */}
        {suggestions.length > 0 && (
          <ul className="list-group mb-3">
            {suggestions.map(r => (
              <li
                key={r}
                className="list-group-item list-group-item-action"
                onClick={() => setData({ ...data, rollNumber: String(r) })}
                style={{ cursor: "pointer" }}
              >
                {r}
              </li>
            ))}
          </ul>
        )}

        {/* Admission form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={data.fatherName}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            type="date"
            name="dob"
            value={data.dob}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={data.age}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          {/* Class Dropdown */}
          <select
            name="class"
            value={data.class}
            onChange={handleChange}
            className="form-select mb-3"
            required
          >
            <option value="">Select Class</option>
            {classOptions.map((cls, index) => (
              <option key={index} value={cls}>{cls}</option>
            ))}
          </select>

          <button type="submit" className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StudentAdmission;

