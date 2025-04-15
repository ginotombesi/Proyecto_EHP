import React, { useState } from 'react';
import './ReservationPage.css';
import { useLocation, useNavigate } from "react-router-dom";

// Simulamos los talles como en PersonForm
const shoeSizes = Array.from({ length: 23 }, (_, i) => (22 + i).toString());
const shirtSizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const pantsSizes = Array.from({ length: 13 }, (_, i) => (38 + i).toString());

const ReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activity = location.state?.activity;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    age: '',
    shoeSize: '',
    shirtSize: '',
    pantsSize: ''
  });

  const [persons, setPersons] = useState([]);
  const [errors, setErrors] = useState({});

  if (!activity) {
    navigate('/activities');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleConfirmReservation = () => {
    // En un sistema real guardarías los datos acá
    setShowConfirmation(true);
  };
  
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    navigate('/activities');
  };
  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = 'Este campo es obligatorio';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addPerson = () => {
    if (!validateForm()) return;

    if (persons.length >= activity.availableSpots) return;

    setPersons([...persons, formData]);
    setFormData({
      fullName: '',
      dni: '',
      age: '',
      shoeSize: '',
      shirtSize: '',
      pantsSize: ''
    });
    setErrors({});
  };

  const removePerson = (index) => {
    const updated = [...persons];
    updated.splice(index, 1);
    setPersons(updated);
  };

  const onBack = () => {
    navigate('/activities');
  };

  return (
    <div className="reservation-page">
      <h2>Reservar para: {activity.name}</h2>
      <p>Cupos disponibles: {activity.availableSpots - persons.length}</p>

      <div className="person-form-wrapper">
      <label>Nombre Completo</label>
        <input
          type="text"
          name="fullName"
          placeholder="Nombre completo"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
        <label>DNI</label>
        <input
        
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
        />
        {errors.dni && <span className="error">{errors.dni}</span>}
        <label>Edad</label>
        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <span className="error">{errors.age}</span>}

        <label>Talla de Zapatos</label>
        <select name="shoeSize" value={formData.shoeSize} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {shoeSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        {errors.shoeSize && <span className="error">{errors.shoeSize}</span>}

        <label>Talla de Remera/Campera</label>
        <select name="shirtSize" value={formData.shirtSize} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {shirtSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        {errors.shirtSize && <span className="error">{errors.shirtSize}</span>}

        <label>Talla de Pantalón</label>
        <select name="pantsSize" value={formData.pantsSize} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {pantsSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        {errors.pantsSize && <span className="error">{errors.pantsSize}</span>}

        {persons.length < activity.availableSpots && (
          <button onClick={addPerson}>+ Agregar Persona</button>
        )}
      </div>

      <div className="person-cards-container">
        {persons.map((person, index) => (
          <div key={index} className="person-card">
            <p><strong>Nombre:</strong> {person.fullName}</p>
            <p><strong>DNI:</strong> {person.dni}</p>
            <p><strong>Edad:</strong> {person.age}</p>
            <p><strong>Tallas:</strong> Zapato {person.shoeSize} - Remera {person.shirtSize} - Pantalón {person.pantsSize}</p>
            <button className="remove-button" onClick={() => removePerson(index)}>Eliminar</button>
          </div>
        ))}
      </div>

      <button onClick={onBack}>← Volver</button>
    </div>
  );
};

export default ReservationPage;
