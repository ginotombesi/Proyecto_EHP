import React, { useState } from 'react';
import './ReservationPage.css';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { crearInscripcion } from '../../../api';

const talles = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const edadANacimiento = (edad) => {
  const hoy = new Date();
  const añoNacimiento = hoy.getFullYear() - edad;
  const mes = hoy.getMonth(); // 0-indexed
  const dia = hoy.getDate();

  const fechaNacimiento = new Date(añoNacimiento, mes, dia);

  const dd = String(fechaNacimiento.getDate()).padStart(2, '0');
  const mm = String(fechaNacimiento.getMonth() + 1).padStart(2, '0'); // sumamos 1 porque enero = 0
  const yyyy = fechaNacimiento.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};



const ReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activity = location.state?.activity;
  const requiereVest = activity?.necesitaTalle === 1;
 
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    age: '',
    talles: ''
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
    if (!formData.fullName.trim()) newErrors.fullName = 'Este campo es obligatorio';
    if (!formData.dni.trim()) newErrors.dni = 'Este campo es obligatorio';
    if (!formData.age.trim()) newErrors.age = 'Este campo es obligatorio';
    if (requiereVest && !formData.talles.trim()) newErrors.talles = 'Este campo es obligatorio';

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
      talles: ''
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

  const handleConfirmReservation = async () => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inscripciones = persons.map((p) => ({
          nombre: p.fullName,
          dni: parseInt(p.dni),
          fechaNac: edadANacimiento(parseInt(p.age)),
          actividad: activity.id,
          talle: p.talles || null,
        }));
  
        try {
          await crearInscripcion(inscripciones);
          Swal.fire({
            title: '¡Reserva confirmada!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => navigate('/activities'));
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar la inscripción.',
          });
        }
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
        {errors.age && <span className="error">{errors.age}</span>}

        {requiereVest && (
          <>
            <label>Talla de Arnés</label>
            <select
              name="talles"
              value={formData.talles}
              onChange={handleChange}
              disabled={isFull}
            >
              <option value="">Seleccionar</option>
              {talles.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            {errors.talles && <span className="error">{errors.talles}</span>}
          </>
        )}

        {!isFull && <button onClick={addPerson}>+ Agregar Persona</button>}
      </div>

      <div className="person-cards-container">
        {persons.map((person, index) => (
          <div key={index} className="person-card">
            <p><strong>Nombre:</strong> {person.fullName}</p>
            <p><strong>DNI:</strong> {person.dni}</p>
            <p><strong>Edad:</strong> {person.age}</p>
            {requiereVest && (
              <p><strong>Talla:</strong> {person.talles}</p>
            )}
            <button className="remove-button" onClick={() => removePerson(index)}>Eliminar</button>
          </div>
        ))}
      </div>

      <button
        className="confirm-button"
        onClick={handleConfirmReservation}
        disabled={persons.length === 0}
      >
        Reservar
      </button>

      <button onClick={onBack}>← Volver</button>
    </div>
  );
};

export default ReservationPage;
