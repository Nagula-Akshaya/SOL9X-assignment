import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../index.css";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const s = await api.get("/students/me");
        setStudent(s);
        setForm({ name: s.name, email: s.email, course: s.course });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/students/${student.id}`, form);
      setMsg("Profile updated successfully");
    } catch (err) {
      setMsg(err.msg || "Error");
    }
  };

  if (!student) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar role="student" />
      <div className="dashboard-container">
        <div className="form-card">
          <h2>My Profile</h2>
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
            <button type="submit">Save</button>
          </form>
          <p className="success">{msg}</p>
          <p>Enrollment: {new Date(student.enrollmentDate).toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
}
