import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AddOperator = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/add-operator", form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMessage("Operator added successfully");
      setForm({ username: "", password: "" });
    } catch (err) {
      setMessage("Error: Username may already exist");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h4>Add New Operator</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" className="form-control my-2" onChange={handleChange} value={form.username} required />
        <input type="password" name="password" placeholder="Password" className="form-control my-2" onChange={handleChange} value={form.password} required />
        <button type="submit" className="btn btn-success w-100">Add Operator</button>
      </form>
      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
};

export default AddOperator;
