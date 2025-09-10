import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../index.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("MERN Bootcamp");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role: "student",
        course,
      });
      localStorage.setItem("token", res.token);
      navigate("/student");
    } catch (error) {
      setErr(error.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={submit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {err && <p className="error">{err}</p>}
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
