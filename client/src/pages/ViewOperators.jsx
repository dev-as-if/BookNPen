import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { FaTrash, FaEdit } from "react-icons/fa";

const ViewOperators = () => {
  const [operators, setOperators] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", id: null });
  const [message, setMessage] = useState("");

  const fetchOperators = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/operators", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setOperators(res.data);
    } catch (err) {
      setMessage("Failed to fetch operators");
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  const handleEdit = (op) => {
    setForm({ username: op.username, password: "", id: op._id });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/update-operator/${form.id}`,
        { username: form.username, password: form.password },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setForm({ username: "", password: "", id: null });
      fetchOperators();
      setMessage("Operator updated");
    } catch {
      setMessage("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm delete?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/remove-operator/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchOperators();
    } catch {
      setMessage("Failed to delete operator");
    }
  };

  return (
    <div className="container mt-4">
      <h4>All Operators</h4>
      {message && <p>{message}</p>}

      {form.id && (
        <form onSubmit={handleUpdate} className="card p-3 mb-3">
          <h6>Edit Operator</h6>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Username"
            className="form-control my-1"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="New Password"
            className="form-control my-1"
          />
          <button type="submit" className="btn btn-warning">Update Operator</button>
        </form>
      )}

      <table className="table table-bordered mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {operators.map((op, i) => (
            <tr key={op._id}>
              <td>{i + 1}</td>
              <td>{op.username}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(op)}><FaEdit /></button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(op._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOperators;
