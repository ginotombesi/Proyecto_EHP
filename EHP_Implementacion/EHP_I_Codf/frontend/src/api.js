// src/api/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // Ajustá esto si usás otro puerto o estás en producción

// ================== INSCRIPCIONES ==================

export const crearInscripcion = (datos, id) =>
  
  axios.post(`${API_BASE}/inscripcion/${id}`, datos); //aca deberia tener asociada la actividad como query.
  




// ================== ACTIVIDADES ==================

export const obtenerActividades = () =>
  axios.get(`${API_BASE}/actividad`);

