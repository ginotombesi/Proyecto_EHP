// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">EHP</div>
      <div className="navbar-links">
        <Link
          to="/login"
          className={location.pathname === "/login" ? "active" : ""}
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className={location.pathname === "/register" ? "active" : ""}
        >
          Registrarse
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
