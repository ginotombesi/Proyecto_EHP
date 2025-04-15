// src/pages/Register.jsx
import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Usuario registrado:", formData);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Registrarse</h2>

        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ej: Juan Pérez"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group password-group">
          <label htmlFor="password">Contraseña</label>
          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label="Mostrar u ocultar contraseña"
            >
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button type="submit" className="register-button">
          Crear cuenta
        </button>

        {submitted && (
          <p className="success-message">¡Registro exitoso (ficticio)!</p>
        )}
      </form>
    </div>
  );
};

export default Register;
