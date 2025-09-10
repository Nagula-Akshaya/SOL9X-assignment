import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">SOL9X Dashboard</h1>
      <div className="nav-links">
        {role === "admin" && <button onClick={() => navigate("/admin")}>Admin</button>}
        {role === "student" && <button onClick={() => navigate("/student")}>Student</button>}
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
