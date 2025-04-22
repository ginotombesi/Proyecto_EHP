import React, { useState, useEffect } from 'react';
import './ReservationPage.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { crearInscripcion } from '../../../api';
import termsMock from './termsMock.json';
const talles = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const ReservationPage = () => {
  const { idActividad } = useParams();
  const [actividad, setActividad] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    age: '',
    talles: ''
  });
  const [pendingPersons, setPendingPersons] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [noPersonsError, setNoPersonsError] = useState('');

  const requiereVest = actividad?.tipoActividad?.requiereVest === 1;
  const descripcion = actividad?.tipoActividad?.descripcion;

  useEffect(() => {
    axios.get('http://localhost:3000/actividad')
      .then(res => {
        const actividadEncontrada = res.data.find(act => act.idActividad === parseInt(idActividad));
        setActividad(actividadEncontrada);
      })
      .catch(err => console.error(err));
  }, [idActividad]);

  if (!actividad) return <p>Cargando Inscripción a la actividad...</p>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Este campo es obligatorio';
    if (!formData.dni.trim()) {
      newErrors.dni = 'Este campo es obligatorio';
    } else if (!/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = 'El DNI debe tener exactamente 8 números';
    } else if (pendingPersons.some(p => p.dni === formData.dni)) {
      newErrors.dni = 'Este DNI ya fue ingresado';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Este campo es obligatorio';
    } else {
      const ageValue = parseInt(formData.age, 10);
      const actividadId = actividad?.tipoActividadId;

      if (isNaN(ageValue)) {
        newErrors.age = 'La edad debe ser un número válido';
      } else {
        if ([2, 4].includes(actividadId)) {
          if (ageValue < 10 || ageValue > 80) newErrors.age = 'Edad permitida: de 10 a 80 años';
        } else {
          if (ageValue < 3 || ageValue > 100) newErrors.age = 'Edad permitida: de 3 a 100 años';
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
    const actividadId = actividad?.tipoActividadId;
    if ([2, 4].includes(actividadId)) return 'Edad permitida: de 10 a 80 años (actividad de alto riesgo)';
    return 'Edad permitida: de 3 a 100 años';
  };

  const addPerson = () => {
    if (noPersonsError) setNoPersonsError('');
    if (pendingPersons.length >= actividad.cupo) {
      Swal.fire({
        icon: 'info',
        title: '¡Sin cupos!',
        text: 'No hay más cupos disponibles para esta actividad.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (!validateForm()) return;

    setPendingPersons([...pendingPersons, formData]);
    setFormData({ fullName: '', dni: '', age: '', talles: '' });
    setErrors({});
  };

  const removePerson = (index) => {
    const updated = [...pendingPersons];
    updated.splice(index, 1);
    setPendingPersons(updated);
  };

  const onBack = () => navigate('/activities');

  const handleConfirmReservation = () => {
    if (pendingPersons.length === 0) {
      setNoPersonsError('Debe cargar al menos una persona para poder reservar.');
      return;
    }
    
    if (!acceptedTerms) {
      setTermsError('Debe aceptar los términos y condiciones para continuar.');
      return;
    }
    setNoPersonsError(''); // limpiamos si todo ok
    Promise.allSettled(
      pendingPersons.map(persona =>
        crearInscripcion({
          dni: persona.dni,
          nombre: persona.fullName,
          edad: persona.age,
          actividad: actividad.idActividad,
          talle: persona.talles || null
        }, actividad.idActividad)
      )
    ).then((results) => {
      const errores = [];
      const exitosas = [];
  
      results.forEach((result, index) => {
        const persona = pendingPersons[index];
        if (result.status === 'fulfilled') {
          exitosas.push(persona);
        } else {
          const mensajeError = result.reason?.response?.data?.error || 'Error desconocido al registrar inscripción.';
          errores.push({
            persona,
            mensaje: mensajeError
          });
        }
      });
  
      // Actualizar estado: dejamos solo los que fallaron, en caso de querer reintentar
      const pendientesRestantes = pendingPersons.filter(p =>
        errores.some(e => e.persona.dni === p.dni)
      );
      setPendingPersons(pendientesRestantes);
  
      // Generar mensaje de resumen
      let htmlMensaje = '';
      if (exitosas.length > 0) {
        htmlMensaje += `<h4 style="color:green;">Inscripciones registradas con éxito:</h4>`;
        htmlMensaje += exitosas.map(p =>
          `<p>✅ ${p.fullName} (DNI: ${p.dni})</p>`
        ).join('');
      }
  
      if (errores.length > 0) {
        htmlMensaje += `<h4 style="color:red; margin-top: 1rem;">Inscripciones rechazadas:</h4>`;
        htmlMensaje += errores.map(e =>
          `<p>❌ ${e.persona.fullName} (DNI: ${e.persona.dni}): ${e.mensaje}</p>`
        ).join('');
      }
  
      Swal.fire({
        icon: errores.length > 0 ? 'warning' : 'success',
        title: 'Resultado de la inscripción',
        html: htmlMensaje,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        setErrors({});
        if (errores.length === 0) {
          navigate('/activities');
        }
      });
    });
  };

  const normalizarDescripcion = (descripcion) => {
    return descripcion
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');
  };
  
  const tipo = normalizarDescripcion(actividad?.tipoActividad?.descripcion);
  const info = termsMock[tipo] || {
    title: 'Términos y condiciones no disponibles para esta actividad.',
    content: ''
  };
;
  
  
 
  const isFull = pendingPersons.length >= actividad.cupo;

  return (
    <div className="reservation-page">
      <h2>Reservar para: {descripcion}</h2>
      <p>Cupos disponibles: {actividad.cupo - pendingPersons.length}</p>
  
      <div className="person-form-wrapper">
        <label>Nombre Completo</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} disabled={isFull} />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
  
        <label>DNI</label>
        <input type="text" name="dni" value={formData.dni} onChange={handleChange} disabled={isFull} />
        {errors.dni && <span className="error">{errors.dni}</span>}
  
        <label>Edad <span className="edad-advertencia">– {getEdadAdvertencia()}</span></label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} disabled={isFull} />
        {errors.age && <span className="error">{errors.age}</span>}
  
        {requiereVest && (
          <>
            <label>{actividad.tipoActividadId === 3 ? 'Talla de Conjunto' : 'Talla de Arnés'}</label>
            <select name="talles" value={formData.talles} onChange={handleChange} disabled={isFull}>
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
        {pendingPersons.map((person, index) => (
          <div key={index} className="person-card">
            <p><strong>Nombre:</strong> {person.fullName}</p>
            <p><strong>DNI:</strong> {person.dni}</p>
            <p><strong>Edad:</strong> {person.age} años</p>
            {requiereVest && <p><strong>Talla:</strong> {person.talles}</p>}
            <button className="remove-button" onClick={() => removePerson(index)}>Eliminar</button>
          </div>
        ))}
      </div>
  
      <div className="terms-container">
  <div className="terms-checkbox-row">
    <input
      type="checkbox"
      id="termsCheckbox"
      checked={acceptedTerms}
      onChange={() => {
        setAcceptedTerms(!acceptedTerms);
        setTermsError('');
      }}
    />
    <label htmlFor="termsCheckbox">Acepto los</label>
    <span
      onClick={() => setShowTermsModal(true)}
      className="terms-link"
    >
      términos y condiciones
    </span>
  </div>

  {termsError && <span className="error">{termsError}</span>}
</div>
  
      {noPersonsError && <p className="error">{noPersonsError}</p>}

      <button
        className="confirm-button"
        onClick={handleConfirmReservation}
        disabled={pendingPersons.length === 0}
      >
        Reservar
      </button>

  
      <button onClick={onBack}>← Volver</button>
  
      {/* Modal de Términos y Condiciones */}
      {showTermsModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>{info.title}</h3>
      <div className="modal-body">
        {info.content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <button className="modal-close" onClick={() => setShowTermsModal(false)}>✕</button>
    </div>
  </div>
)}



    </div>
  );
  
};

export default ReservationPage;
