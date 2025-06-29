// import React, { useState } from "react";
// import { logout } from "../utils/auth";
// import { useNavigate } from "react-router-dom";
// import ManageOperators from "./ManageOperators";
// import ViewStudents from "./ViewStudents";
// import SearchStudent from "./SearchStudent";
// import FilterStudents from "./FilterStudents";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/erp-login");
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "manage-operators":
//         return <ManageOperators key={activeTab} />;
//       case "view-students":
//         return <ViewStudents />;
//       case "search-student":
//         return <SearchStudent />;
//       case "filter-students":
//         return <FilterStudents />;
//       default:
//         return (
//           <div className="text-muted">
//             Please select a section from the left to get started.
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
//         <h4 className="mb-0">Admin Dashboard</h4>
//         <button className="btn btn-outline-danger" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3 bg-light border-end min-vh-100 p-3">
//           <h5 className="mb-3">Admin Controls</h5>

//           <div className="list-group">
//             <button
//               className={`list-group-item list-group-item-action ${activeTab === "manage-operators" && "active"}`}
//               onClick={() => setActiveTab("manage-operators")}
//             >
//               Operator Management
//             </button>

//             <button
//               className={`list-group-item list-group-item-action ${activeTab === "view-students" && "active"}`}
//               onClick={() => setActiveTab("view-students")}
//             >
//               View All Students
//             </button>

//             <button
//               className={`list-group-item list-group-item-action ${activeTab === "search-student" && "active"}`}
//               onClick={() => setActiveTab("search-student")}
//             >
//               Find Student
//             </button>

//             <button
//               className={`list-group-item list-group-item-action ${activeTab === "filter-students" && "active"}`}
//               onClick={() => setActiveTab("filter-students")}
//             >
//               Filter by Class / Fee
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 p-4">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

// Sub-sections (to be implemented)
import ManageOperators from "./ManageOperators";
import ViewStudents from "./ViewStudents";
import SearchStudent from "./SearchStudent";
import FilterStudents from "./FilterStudents";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/erp-login");
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "manage-operators":
        return <ManageOperators />;
      case "view-students":
        return <ViewStudents />;
      case "search-student":
        return <SearchStudent />;
      case "filter-students":
        return <FilterStudents />;
      default:
        return (
          <div className="text-muted text-center mt-5">
            <h5>Select an option from the sidebar to begin.</h5>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white shadow-sm">
        <h4 className="mb-0">Admin Dashboard</h4>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light border-end vh-100 p-3">
          <h5 className="mb-3">Admin Controls</h5>
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${activeTab === "manage-operators" ? "active" : ""}`}
              onClick={() => setActiveTab("manage-operators")}
            >
              Manage Operators
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === "view-students" ? "active" : ""}`}
              onClick={() => setActiveTab("view-students")}
            >
              View All Students
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === "search-student" ? "active" : ""}`}
              onClick={() => setActiveTab("search-student")}
            >
              Search Student
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === "filter-students" ? "active" : ""}`}
              onClick={() => setActiveTab("filter-students")}
            >
              Filter Students
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
