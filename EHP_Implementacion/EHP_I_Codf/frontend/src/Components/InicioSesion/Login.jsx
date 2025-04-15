// src/pages/Login.jsx
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Lógica de validación para el login (aquí lo hacemos de manera ficticia)
    if (formData.email && formData.password) {
      Swal.fire('¡Inicio de sesión exitoso!', '', 'success');
      // Redirigir a la página de actividades
      navigate('/activities');
    } else {
      Swal.fire('Error', 'Por favor, ingresa un correo y contraseña válidos', 'error');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>

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

        <button type="submit" className="login-button">
          Iniciar sesión
        </button>

        {submitted && (
          <p className="success-message">¡Inicio de sesión exitoso (ficticio)!</p>
        )}
      </form>
    </div>
  );
};

export default Login;
