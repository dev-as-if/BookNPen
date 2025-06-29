// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { setToken } from "../utils/auth";

// const ERPLogin = () => {
//   const [formData, setFormData] = useState({ username: "", password: "", role: "admin" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", formData);
//       setToken(res.data.token, formData.role);
//       if (formData.role === "admin") navigate("/admin-dashboard");
//       else navigate("/operator-dashboard");
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "400px" }}>
//       <h3>ERP Login</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group my-2">
//           <input type="text" name="username" className="form-control" placeholder="Username" onChange={handleChange} required />
//         </div>
//         <div className="form-group my-2">
//           <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
//         </div>
//         <div className="form-group my-2">
//           <select name="role" className="form-select" onChange={handleChange}>
//             <option value="admin">Admin</option>
//             <option value="operator">Operator</option>
//           </select>
//         </div>
//         <button className="btn btn-primary w-100" type="submit">Login</button>
//         {error && <p className="text-danger mt-2">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default ERPLogin;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

const ERPLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "", role: "admin" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: formData.username,
        password: formData.password,
        role: formData.role, // Send role to help backend match the correct user
      });

      const { token, role } = res.data;

      // ✅ Save token & backend-confirmed role
      setToken(token, role);

      // ✅ Navigate based on backend-confirmed role (NOT selected dropdown)
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "operator") navigate("/operator-dashboard");
      else setError("Unauthorized role");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>ERP Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group my-2">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group my-2">
          <select
            name="role"
            className="form-select"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
          </select>
        </div>
        <button className="btn btn-primary w-100" type="submit">Login</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ERPLogin;
