import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../index.css";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", course: "MERN Bootcamp", password: "" });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const data = await api.get("/students");
      setStudents(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/students/${editId}`, {
          name: form.name,
          email: form.email,
          course: form.course,
        });
        setMsg("Updated successfully");
      } else {
        await api.post("/students", {
          name: form.name,
          email: form.email,
          course: form.course,
          password: form.password || undefined,
        });
        setMsg("Student added successfully");
      }
      setForm({ name: "", email: "", course: "MERN Bootcamp", password: "" });
      setEditId(null);
      load();
    } catch (err) {
      setMsg(err.msg || "Error occurred");
    }
  };

  const startEdit = (s) => {
    setEditId(s.id);
    setForm({ name: s.name, email: s.email, course: s.course, password: "" });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete student?")) return;
    await api.del(`/students/${id}`);
    load();
  };

  return (
    <>
      <Navbar role="admin" />
      <div className="dashboard-container">
        <div className="form-card">
          <h3>{editId ? "Edit Student" : "Add Student"}</h3>
          <form onSubmit={submit}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              placeholder="Course"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              required
            />
            {!editId && (
              <input
                placeholder="Initial Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            )}
            <button type="submit">{editId ? "Update" : "Add"}</button>
          </form>
          <p className="success">{msg}</p>
        </div>

        <div className="table-card">
          <h3>Students</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Enrollment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>{new Date(s.enrollmentDate).toLocaleDateString()}</td>
                  <td>
                    <button className="edit" onClick={() => startEdit(s)}>Edit</button>
                    <button className="delete" onClick={() => remove(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
