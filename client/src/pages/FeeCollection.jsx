// import React, { useState } from "react";
// import axios from "axios";
// import { getToken } from "../utils/auth";

// const FeeCollection = () => {
//   const [rollNumber, setRollNumber] = useState("");
//   const [student, setStudent] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [month, setMonth] = useState("");
//   const [message, setMessage] = useState("");

//   const searchStudent = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/students/search", {
//         headers: { Authorization: `Bearer ${getToken()}` },
//         params: { rollNumber },
//       });
//       setStudent(res.data[0] || null);
//       setMessage(res.data.length ? "" : "Student not found.");
//     } catch {
//       setMessage("Error searching student.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/api/fee/add",
//         { rollNumber, amount, month },
//         { headers: { Authorization: `Bearer ${getToken()}` } }
//       );
//       setMessage("Fee added successfully.");
//       setAmount(""); setMonth("");
//     } catch {
//       setMessage("Error adding fee.");
//     }
//   };

//   return (
//     <div className="container mt-4" style={{ maxWidth: "600px" }}>
//       <h3>Collect Fee</h3>
//       <div className="input-group mb-3">
//         <input type="text" className="form-control" placeholder="Enter Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
//         <button className="btn btn-secondary" onClick={searchStudent}>Search</button>
//       </div>

//       {student && (
//         <div className="mb-3">
//           <p><strong>Name:</strong> {student.name}</p>
//           <p><strong>Class:</strong> {student.class}</p>

//           <form onSubmit={handleSubmit}>
//             <input type="number" className="form-control mb-2" placeholder="Amount Paid (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
//             <input type="text" className="form-control mb-2" placeholder="Month (e.g., June 2025)" value={month} onChange={(e) => setMonth(e.target.value)} required />
//             <button type="submit" className="btn btn-success w-100">Add Fee</button>
//           </form>
//         </div>
//       )}

//       {message && <div className="alert alert-info mt-3">{message}</div>}
//     </div>
//   );
// };

// export default FeeCollection;

import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaMoneyBill } from "react-icons/fa";

const FeeCollection = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const searchStudent = async () => {
    try {
      const res = await axios.get("https://booknpen.onrender.com/api/operator/student", {
        headers: { Authorization: `Bearer ${getToken()}` },
        params: { rollNumber },
      });
      if (res.data.length === 0) {
        setStudent(null);
        setMessage("Student not found.");
      } else {
        setStudent(res.data[0]);
        setMessage("");
      }
    } catch {
      setMessage("Error fetching student");
      setStudent(null);
    }
  };

  const handleFeeSubmit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const res = await axios.post(
        `https://booknpen.onrender.com/api/operator/collect-fee/${rollNumber}`,
        { amount },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      alert(res.data.message);
      setAmount("");
      searchStudent(); // Refresh student info
    } catch {
      alert("Fee collection failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate("/operator-dashboard")}>
        <FaArrowLeft className="me-1" /> Back to Dashboard
      </button>

      <h4 className="mb-3">Fee Collection</h4>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchStudent}>
          <FaSearch className="me-1" /> Search
        </button>
      </div>

      {message && <p className="text-danger">{message}</p>}

      {student && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5>{student.name}</h5>
            <p>Class: {student.class}</p>
            <p>Fee Paid: ₹{student.feePaid || 0} / ₹{student.totalFee || 0}</p>

            <div className="input-group my-3">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                className="form-control"
                placeholder="Amount to collect"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button className="btn btn-success w-100" onClick={handleFeeSubmit}>
              <FaMoneyBill className="me-2" />
              Collect Fee
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeCollection;

