import React, { useState } from 'react';
import './ReservationPage.css';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const talles = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const ReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activity = location.state?.activity;
  const requiereVest = activity?.necesitaTalle === 1;
  console.log(activity)
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    age: '',
    talles: ''
  });

  const [persons, setPersons] = useState([]);
  const [errors, setErrors] = useState({});

  //aceptacion terminos y condiciones
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState('');

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
  
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Este campo es obligatorio';
    }
  
    if (!formData.dni.trim()) {
      newErrors.dni = 'Este campo es obligatorio';
    } else if (!/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = 'El DNI debe tener exactamente 8 números';
    } else if (persons.some(p => p.dni === formData.dni)) {
      newErrors.dni = 'Este DNI ya fue ingresado';
    }
  
    if (!formData.age.trim()) {
      newErrors.age = 'Este campo es obligatorio';
    } else {
      const ageValue = parseInt(formData.age, 10);
      const actividadId = activity?.idActividad;
  
      if (isNaN(ageValue)) {
        newErrors.age = 'La edad debe ser un número válido';
      } else {
        if (actividadId === 2 || actividadId === 4) {
          if (ageValue < 10) {
            newErrors.age = 'Para esta actividad la edad mínima es de 10 años';
          } else if (ageValue > 80) {
            newErrors.age = 'La edad máxima para esta actividad es de 80 años';
          }
        } else if (actividadId === 1 || actividadId === 3) {
          if (ageValue < 3) {
            newErrors.age = 'La edad mínima para esta actividad es de 3 años';
          } else if (ageValue > 100) {
            newErrors.age = 'Por favor, ingrese una edad válida (máx. 100 años)';
          }
        } else {
          if (ageValue < 3) {
            newErrors.age = 'La edad no puede ser menor a 3 años';
          } else if (ageValue > 100) {
            newErrors.age = 'Por favor, ingrese una edad válida (máx. 100 años)';
          }
        }
      }
    }
  
    if (requiereVest && !formData.talles.trim()) {
      newErrors.talles = 'Este campo es obligatorio';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const getEdadAdvertencia = () => {
    const actividadId = activity?.idTipoActividad
  ;
    console.log(actividadId)
    if (actividadId === 2 || actividadId === 4) {
      return 'Edad permitida: de 10 a 80 años (actividad de alto riesgo)';
    } else if (actividadId === 1 || actividadId === 3) {
      return 'Edad permitida: de 3 a 100 años';
    } else {
      return 'Edad permitida: de 3 a 100 años';
    }
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

  const handleConfirmReservation = () => {
    
    if (!acceptedTerms) {
      setTermsError('Debe aceptar los términos y condiciones para continuar.');
      return;
    }

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

        <label>Edad
        <span className="edad-advertencia"> – {getEdadAdvertencia()}</span>
        </label>
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
            <label>{activity.idTipoActividad === 3 ? 'Talla de Conjunto' : 'Talla de Arnés'}</label>
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
            <p><strong>Edad:</strong> {person.age} años</p>
            {requiereVest && (
              <p><strong>Talla:</strong> {person.talles}</p>
            )}
            <button className="remove-button" onClick={() => removePerson(index)}>Eliminar</button>
          </div>
        ))}
      </div>

      <div className="terms-container">
          <label>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => {
                setAcceptedTerms(!acceptedTerms);
                setTermsError('');
              }}
            />
            Acepto los <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">términos y condiciones</a>
          </label>
          {termsError && <span className="error">{termsError}</span>}
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
