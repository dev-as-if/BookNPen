// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { getToken } from "../utils/auth";
// import { FaTrash, FaEdit } from "react-icons/fa";

// const ManageOperators = ({active}) => {
//   const [operators, setOperators] = useState([]);
//   const [form, setForm] = useState({ username: "", password: "", id: null });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const token = getToken();

//   const fetchOperators = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/operators", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOperators(res.data);
//     } catch (err) {
//       setError("Failed to fetch operators");
//     }
//   };

//   useEffect(() => { fetchOperators(); }, []); // no dependencies
// //   useEffect(() => {
// //   if (active) fetchOperators();
// // }, [active]);



//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     try {
//       if (form.id) {
//         await axios.put(
//           `http://localhost:5000/api/admin/update-operator/${form.id}`,
//           { username: form.username, password: form.password },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setSuccess("Operator updated");
//       } else {
//         await axios.post(
//           "http://localhost:5000/api/admin/add-operator",
//           { username: form.username, password: form.password },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setSuccess("Operator added");
//       }
//       setForm({ username: "", password: "", id: null });
//       fetchOperators();
//     } catch (err) {
//       setError("Action failed. Username might already exist.");
//     }
//   };

//   const handleEdit = (op) => {
//     setForm({ username: op.username, password: "", id: op._id });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/remove-operator/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchOperators();
//     } catch {
//       setError("Failed to delete operator");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h4>{form.id ? "Edit Operator" : "Add Operator"}</h4>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <div className="mb-2">
//           <input
//             type="text"
//             name="username"
//             className="form-control"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-2">
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             placeholder={form.id ? "New Password (optional)" : "Password"}
//             onChange={handleChange}
//             required={!form.id}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100">
//           {form.id ? "Update Operator" : "Add Operator"}
//         </button>
//         {error && <p className="text-danger mt-2">{error}</p>}
//         {success && <p className="text-success mt-2">{success}</p>}
//       </form>

//       <h5>All Operators</h5>
//       <div className="table-responsive">
//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Username</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {operators.map((op, i) => (
//               <tr key={op._id}>
//                 <td>{i + 1}</td>
//                 <td>{op.username}</td>
//                 <td>
//                   <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(op)}>
//                     <FaEdit />
//                   </button>
//                   <button className="btn btn-sm btn-danger" onClick={() => handleDelete(op._id)}>
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {operators.length === 0 && (
//               <tr>
//                 <td colSpan="3" className="text-center text-muted">No operators found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageOperators;

// src/pages/ManageOperators.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageOperators = () => {
  const [operators, setOperators] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", id: null });
  const [message, setMessage] = useState({ type: "", text: "" });

  const token = getToken();

  const fetchOperators = async () => {
    try {
      const res = await axios.get("https://booknpen.onrender.com/api/admin/operators", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOperators(res.data);
    } catch {
      setMessage({ type: "danger", text: "Failed to fetch operators." });
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      if (form.id) {
        // Update
        await axios.put(
          `https://booknpen.onrender.com/api/admin/update-operator/${form.id}`,
          { username: form.username, password: form.password },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage({ type: "success", text: "Operator updated successfully!" });
      } else {
        // Add
        await axios.post(
          "https://booknpen.onrender.com/api/admin/add-operator",
          { username: form.username, password: form.password },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage({ type: "success", text: "Operator added successfully!" });
      }

      setForm({ username: "", password: "", id: null });
      fetchOperators();
    } catch (err) {
      setMessage({ type: "danger", text: err.response?.data?.message || "Action failed." });
    }
  };

  const handleEdit = (op) => {
    setForm({ username: op.username, password: "", id: op._id });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this operator?")) return;
    try {
      await axios.delete(`https://booknpen.onrender.com/api/admin/remove-operator/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: "success", text: "Operator deleted successfully." });
      fetchOperators();
    } catch {
      setMessage({ type: "danger", text: "Failed to delete operator." });
    }
  };

  return (
    <div className="container">
      <h4 className="mb-3">{form.id ? "Edit Operator" : "Add Operator"}</h4>
      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder={form.id ? "New Password (optional)" : "Password"}
            value={form.password}
            onChange={handleChange}
            required={!form.id}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {form.id ? "Update Operator" : "Add Operator"}
        </button>
      </form>

      <h5>All Operators</h5>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {operators.length > 0 ? (
              operators.map((op, index) => (
                <tr key={op._id}>
                  <td>{index + 1}</td>
                  <td>{op.username}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(op)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(op._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No operators found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOperators;

