// import React, { useState } from "react";
// import axios from "axios";
// import { getToken } from "../utils/auth";

// const SearchStudent = () => {
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     if (!query.trim()) return;
//     try {
//       const res = await axios.get(`http://localhost:5000/api/students/search`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//         params: { query }
//       });
//       setResult(res.data[0] || null);
//       setError("");
//     } catch (err) {
//       setResult(null);
//       setError("Student not found.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h4>Find Student</h4>
//       <div className="input-group mb-3">
//         <input
//           type="text"
//           placeholder="Enter name or roll number"
//           className="form-control"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleSearch}>Search</button>
//       </div>
//       {error && <p className="text-danger">{error}</p>}
//       {result && (
//         <div className="card p-3">
//           <h5>{result.name}</h5>
//           <p><strong>Roll No:</strong> {result.rollNumber}</p>
//           <p><strong>Father Name:</strong> {result.fatherName}</p>
//           <p><strong>Class:</strong> {result.class}</p>
//           <p><strong>Date of Birth:</strong> {result.dob?.slice(0, 10)}</p>
//           <p><strong>Address:</strong> {result.address}</p>
//           <p><strong>Total Fee:</strong> ₹{result.totalFee}</p>
//           <p><strong>Paid Fee:</strong> ₹{result.feePaid || 0}</p>
//           <p><strong>Status:</strong> {result.totalFee - (result.feePaid || 0) <= 0 ? "Paid" : "Pending"}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchStudent;

// src/pages/SearchStudent.jsx
import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const SearchStudent = () => {
  const [query, setQuery] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");

  const searchStudent = async () => {
    if (!query) return setMessage("Enter name or roll number");

    try {
      const res = await axios.get(`http://localhost:5000/api/students/search`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        params: { query },
      });
      setStudent(res.data);
      setMessage("");
    } catch (err) {
      setStudent(null);
      setMessage("Student not found.");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Find Student by Name or Roll Number</h4>

      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter name or roll number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchStudent}>
          Search
        </button>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {student && (
        <div className="card mt-4">
          <div className="card-header bg-secondary text-white">
            Student Details
          </div>
          <div className="card-body">
            <p><strong>Roll Number:</strong> {student.rollNumber}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Father's Name:</strong> {student.fatherName}</p>
            <p><strong>Date of Birth:</strong> {student.dateOfBirth?.substring(0, 10)}</p>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Class:</strong> {student.class}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Fee Paid:</strong> ₹{student.feePaid || 0}</p>
            <p><strong>Total Fee:</strong> ₹{student.totalFee || 0}</p>
            <p><strong>Admission Date:</strong> {new Date(student.admissionDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchStudent;
