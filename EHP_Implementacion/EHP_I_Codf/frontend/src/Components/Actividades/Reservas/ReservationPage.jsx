import React, { useState } from 'react';
import './ReservationPage.css';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const shoeSizes = Array.from({ length: 23 }, (_, i) => (22 + i).toString());
const shirtSizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const pantsSizes = Array.from({ length: 13 }, (_, i) => (38 + i).toString());

const ReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activity = location.state?.activity;
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

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = 'Este campo es obligatorio';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addPerson = () => {
    if (persons.length >= activity.availableSpots) {
      Swal.fire({
        icon: 'info',
        title: '¡Sin cupos!',
        text: 'No hay más cupos disponibles para esta actividad.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (!validateForm()) return;

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

  const handleConfirmReservation = () => {
    Swal.fire({
      title: '¿Confirmar reserva?',
      text: `Estás por reservar ${persons.length} lugar(es) para "${activity.name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Reserva confirmada!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => navigate('/activities'));
      }
    });
  };

  const isFull = persons.length >= activity.availableSpots;

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
          disabled={isFull}
        />
        {isFull && <span className="error">Se alcanzó el límite de cupos</span>}
        {errors.fullName && <span className="error">{errors.fullName}</span>}

        <label>DNI</label>
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          disabled={isFull}
        />
        {isFull && <span className="error">Se alcanzó el límite de cupos</span>}
        {errors.dni && <span className="error">{errors.dni}</span>}

        <label>Edad</label>
        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
          disabled={isFull}
        />
        {isFull && <span className="error">Se alcanzó el límite de cupos</span>}
        {errors.age && <span className="error">{errors.age}</span>}

        <label>Talla de Zapatos</label>
        <select
          name="shoeSize"
          value={formData.shoeSize}
          onChange={handleChange}
          disabled={isFull}
        >
          <option value="">Seleccionar</option>
          {shoeSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        
        {errors.shoeSize && <span className="error">{errors.shoeSize}</span>}

        <label>Talla de Remera/Campera</label>
        <select
          name="shirtSize"
          value={formData.shirtSize}
          onChange={handleChange}
          disabled={isFull}
        >
          <option value="">Seleccionar</option>
          {shirtSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        {isFull && <span className="error">Se alcanzó el límite de cupos</span>}
        {errors.shirtSize && <span className="error">{errors.shirtSize}</span>}

        <label>Talla de Pantalón</label>
        <select
          name="pantsSize"
          value={formData.pantsSize}
          onChange={handleChange}
          disabled={isFull}
        >
          <option value="">Seleccionar</option>
          {pantsSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        {isFull && <span className="error">Se alcanzó el límite de cupos</span>}
        {errors.pantsSize && <span className="error">{errors.pantsSize}</span>}

        {!isFull && <button onClick={addPerson}>+ Agregar Persona</button>}
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

      <button
        className="confirm-button"
        onClick={handleConfirmReservation}
        disabled={persons.length === 0}
      >
        📝 Reservar
      </button>

      <button onClick={onBack}>← Volver</button>
    </div>
  );
};

export default ReservationPage;