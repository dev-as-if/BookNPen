// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { getToken } from "../utils/auth";

// const FilterStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [classes, setClasses] = useState([
//     "Nursery", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
//   ]);

//   const fetchFilteredStudents = async () => {
//     // let url = `http://localhost:5000/api/students/filter?filter=${filterType}`;
//     // if (selectedClass) {
//     //   url += `&class=${selectedClass}`;
//     // }

//     try {
//       const res = await axios.get("http://localhost:5000/api/students/filter", {
//         headers: { Authorization: `Bearer ${getToken()}` },
//         params: { filter: filterType, class: selectedClass },
//       });
//       setStudents(res.data);
//     } catch {
//       setStudents([]);
//     }
//   };

//   useEffect(() => {
//     fetchFilteredStudents();
//   }, [filterType, selectedClass]);

//   return (
//     <div className="container mt-4">
//       <h4>Filter Students</h4>
//       <div className="row mb-3">
//         <div className="col-md-4 col-sm-12 mb-2">
//           <label>Filter By:</label>
//           <select
//             className="form-select"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//           >
//             <option value="all">All</option>
//             <option value="paid">Paid</option>
//             <option value="pending">Pending</option>
//           </select>
//         </div>
//         <div className="col-md-4 col-sm-12 mb-2">
//           <label>Class:</label>
//           <select
//             className="form-select"
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//           >
//             <option value="">All Classes</option>
//             {classes.map((cls) => (
//               <option key={cls} value={cls}>{cls}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Roll No</th>
//               <th>Name</th>
//               <th>Class</th>
//               <th>Paid</th>
//               <th>Total</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length > 0 ? (
//               students.map((s, i) => (
//                 <tr key={s._id}>
//                   <td>{i + 1}</td>
//                   <td>{s.rollNumber}</td>
//                   <td>{s.name}</td>
//                   <td>{s.class}</td>
//                   <td>₹{s.feePaid || 0}</td>
//                   <td>₹{s.totalFee || 0}</td>
//                   <td>{s.totalFee - (s.feePaid || 0) <= 0 ? "Paid" : "Pending"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center text-muted">No students found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FilterStudents;


// src/pages/FilterStudents.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const FilterStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [feeStatus, setFeeStatus] = useState("all");

  const fetchFilteredStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students/filter", {
        headers: { Authorization: `Bearer ${getToken()}` },
        params: {
          class: selectedClass,
          filter: feeStatus,
        },
      });
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching filtered students");
    }
  };

  useEffect(() => {
    fetchFilteredStudents();
  }, [selectedClass, feeStatus]);

  const classOptions = Array.from({ length: 11 }, (_, i) => `Class ${i}`); // 0 to 10

  return (
    <div className="container mt-4">
      <h4>Filter Students</h4>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Select Class</label>
          <select
            className="form-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Fee Status</label>
          <select
            className="form-select"
            value={feeStatus}
            onChange={(e) => setFeeStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Fee Paid</th>
              <th>Total Fee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => {
              const status = (s.feePaid || 0) >= (s.totalFee || 0) ? "Paid" : "Pending";
              return (
                <tr key={s.rollNumber}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.rollNumber}</td>
                  <td>{s.class}</td>
                  <td>₹{s.feePaid || 0}</td>
                  <td>₹{s.totalFee || 0}</td>
                  <td className={status === "Paid" ? "text-success" : "text-danger"}>
                    {status}
                  </td>
                </tr>
              );
            })}
            {students.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No matching students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilterStudents;
