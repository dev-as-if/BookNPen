import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const OperatorViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState({ name: "", rollNumber: "" });
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/operator/student", {
        headers: { Authorization: `Bearer ${getToken()}` },
        params: search,
      });
      setStudents(res.data);
    } catch {
      alert("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents(); // Initial load (with empty search = all students)
  }, []);

  const handleInputChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate("/operator-dashboard")}>
        <FaArrowLeft className="me-1" /> Back to Dashboard
      </button>

      <h4>View / Search Students</h4>

      <div className="row my-3">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Search by Name"
            value={search.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            name="rollNumber"
            placeholder="Search by Roll Number"
            value={search.rollNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={fetchStudents}>
            Search
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Roll</th>
              <th>Name</th>
              <th>Father</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Class</th>
              <th>Address</th>
              <th>Fee Paid</th>
              <th>Total Fee</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s, i) => (
                <tr key={i}>
                  <td>{s.rollNumber}</td>
                  <td>{s.name}</td>
                  <td>{s.fatherName}</td>
                  <td>{s.dateOfBirth?.substring(0, 10)}</td>
                  <td>{s.age}</td>
                  <td>{s.class}</td>
                  <td>{s.address}</td>
                  <td>{s.feePaid || 0}</td>
                  <td>{s.totalFee || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OperatorViewStudents;
