import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users";

function Exercise8() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  // Fetch users from MongoDB
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setUsers);
  }, []);

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    if (editId) {
      // Update
      const res = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setUsers(users.map(u => u._id === editId ? updated : u));
      setEditId(null);
    } else {
      // Create
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
    }
    setForm({ name: "", email: "" });
  };

  // Edit
  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user._id);
  };

  // Delete
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setUsers(users.filter(u => u._id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ name: "", email: "" });
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center" }}>CRUD Operation (MongoDB)</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ flex: 1, padding: 8 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" className="btn">
          {editId ? "Update" : "Add"}
        </button>
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f3f3" }}>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{user.name}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{user.email}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                <button onClick={() => handleEdit(user)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={{ color: "red" }}>Delete</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: 16 }}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Exercise8;