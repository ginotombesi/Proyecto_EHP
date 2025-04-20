// src/api/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // Ajustá esto si usás otro puerto o estás en producción

// ================== INSCRIPCIONES ==================

export const crearInscripcion = (datos) =>
  axios.post(`${API_BASE}/inscripcion`, datos); //aca deberia tener asociada la actividad como query.


//no hace falta.
export const obtenerInscripciones = () =>
  axios.get(`${API_BASE}/inscripcion`);

export const obtenerInscripcionPorDni = (dni) =>
  axios.get(`${API_BASE}/inscripcion/${dni}`);

export const actualizarInscripcion = (dni, datos) =>
  axios.put(`${API_BASE}/inscripcion/${dni}`, datos);

export const eliminarInscripcion = (dni) =>
  axios.delete(`${API_BASE}/inscripcion/${dni}`);

// ================== TIPO DE ACTIVIDAD ==================

export const crearTipoActividad = (datos) =>
  axios.post(`${API_BASE}/tipoActividad`, datos);

export const obtenerTiposActividad = () =>
  axios.get(`${API_BASE}/tipoActividad`);

export const obtenerTipoActividadPorId = (idTipo) =>
  axios.get(`${API_BASE}/tipoActividad/${idTipo}`);

export const actualizarTipoActividad = (idTipo, datos) =>
  axios.put(`${API_BASE}/tipoActividad/${idTipo}`, datos);

export const eliminarTipoActividad = (idTipo) =>
  axios.delete(`${API_BASE}/tipoActividad/${idTipo}`);

// ================== ACTIVIDADES ==================

export const obtenerActividades = () =>
  axios.get(`${API_BASE}/actividad`);

