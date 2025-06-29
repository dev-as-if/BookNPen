// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { getToken } from "../utils/auth";

// const ViewStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState({ name: "", rollNumber: "" });

//   const fetchStudents = useCallback(async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/students/all", {
//         headers: { Authorization: `Bearer ${getToken()}` }
//       });
//       setStudents(res.data);
//     } catch (err) {
//       console.error("Error fetching students");
//     }
//   }, []);

//   useEffect(() => {
//     fetchStudents();
//   }, [fetchStudents]);

//   return (
//     <div className="container mt-4">
//       <h3>Student Records</h3>
//       <div className="row my-3">
//         <div className="col-md-5">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search by Name"
//             value={search.name}
//             onChange={(e) => setSearch({ ...search, name: e.target.value })}
//           />
//         </div>
//         <div className="col-md-5">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search by Roll Number"
//             value={search.rollNumber}
//             onChange={(e) => setSearch({ ...search, rollNumber: e.target.value })}
//           />
//         </div>
//         <div className="col-md-2">
//           <button className="btn btn-primary w-100" onClick={fetchStudents}>Search</button>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Roll</th>
//               <th>Name</th>
//               <th>Father</th>
//               <th>Age</th>
//               <th>DOB</th>
//               <th>Class</th>
//               <th>Address</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((s, idx) => (
//               <tr key={idx}>
//                 <td>{s.rollNumber}</td>
//                 <td>{s.name}</td>
//                 <td>{s.fatherName}</td>
//                 <td>{s.age}</td>
//                 <td>{s.dateOfBirth?.substring(0, 10)}</td>
//                 <td>{s.class}</td>
//                 <td>{s.address}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => deleteStudent(s.rollNumber)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   async function deleteStudent(rollNumber) {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${rollNumber}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       alert("Student deleted.");
//       fetchStudents();
//     } catch (err) {
//       alert("Error deleting student.");
//     }
//   }
// };

// export default ViewStudents;

// src/pages/ViewStudents.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState({ name: "", rollNumber: "" });
  const [message, setMessage] = useState("");

  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get("https://booknpen.onrender.com/api/students/all", {
        headers: { Authorization: `Bearer ${getToken()}` },
        params: search,
      });
      setStudents(res.data);
    } catch (err) {
      setMessage("Failed to fetch student records.");
      setStudents([]);
    }
  }, [search]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const deleteStudent = async (rollNumber) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`https://booknpen.onrender.com/api/students/${rollNumber}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMessage("Student deleted successfully.");
      fetchStudents();
    } catch (err) {
      setMessage("Error deleting student.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Student Records</h3>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="row my-3">
        <div className="col-md-5">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Search by Name"
            value={search.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            name="rollNumber"
            className="form-control"
            placeholder="Search by Roll Number"
            value={search.rollNumber}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={fetchStudents}>
            Search
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Roll</th>
              <th>Name</th>
              <th>Father</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Class</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s, i) => (
                <tr key={i}>
                  <td>{s.rollNumber}</td>
                  <td>{s.name}</td>
                  <td>{s.fatherName}</td>
                  <td>{s.age}</td>
                  <td>{s.dateOfBirth?.substring(0, 10)}</td>
                  <td>{s.class}</td>
                  <td>{s.address}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteStudent(s.rollNumber)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudents;

