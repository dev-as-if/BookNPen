// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { getToken, logout } from "../utils/auth";
// import { useNavigate } from "react-router-dom";

// const OperatorDashboard = () => {
//   const navigate = useNavigate();

//   const promoteAll = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/students/promote",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );
//       alert(res.data.message + ` (${res.data.count} students)`);
//     } catch (err) {
//       alert("Error promoting students");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/#/erp-login");
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Operator Dashboard</h2>
//       <div className="d-flex flex-column align-items-start gap-3 mt-4">
//         <Link to="/#/admit-student" className="btn btn-primary">
//           Admit New Student
//         </Link>

//         <Link to="/#/view-students" className="btn btn-outline-primary">
//           View/Search Students
//         </Link>

//         <button className="btn btn-warning" onClick={promoteAll}>
//           Promote All Students
//         </button>

//         <button className="btn btn-danger" onClick={handleLogout}>
//           Logout
//         </button>

//         <Link to="/#/fee-collection" className="btn btn-success m-2">Fee Collection</Link>

//       </div>
//     </div>
//   );
// };

// export default OperatorDashboard;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, logout } from "../utils/auth";
import { FaUserPlus, FaSearch, FaArrowUp, FaMoneyBill, FaSignOutAlt } from "react-icons/fa";

const OperatorDashboard = () => {
  const navigate = useNavigate();

  const promoteAll = async () => {
    const confirm = window.confirm("Are you sure you want to promote all students to the next class?");
    if (!confirm) return;

    try {
      const res = await axios.put("http://localhost:5000/api/students/promote", {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert(`${res.data.message} (${res.data.count} students)`);
    } catch (err) {
      alert("Error promoting students");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/erp-login");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Welcome Operator 👋</h3>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <FaUserPlus size={30} className="mb-2 text-primary" />
              <h5>Admit New Student</h5>
              <Link to="/admit-student" className="btn btn-primary mt-2 w-100">
                Go
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <FaSearch size={30} className="mb-2 text-info" />
              <h5>View / Search Students</h5>
              <Link to="/opview-students" className="btn btn-info mt-2 w-100 text-white">
                Go
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <FaArrowUp size={30} className="mb-2 text-warning" />
              <h5>Promote All Students</h5>
              <button className="btn btn-warning mt-2 w-100" onClick={promoteAll}>
                Promote
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <FaMoneyBill size={30} className="mb-2 text-success" />
              <h5>Fee Collection</h5>
              <Link to="/fee-collection" className="btn btn-success mt-2 w-100">
                Go
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
