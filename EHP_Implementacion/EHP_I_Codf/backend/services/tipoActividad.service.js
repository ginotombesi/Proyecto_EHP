const TipoActividad = require('../models/tipoActividadModel.js');

/// Crear un nuevo tipo de actividad
const crearTipoActividad = async (datos) => await TipoActividad.create(datos);

// Obtener todos los tipos de actividad
const obtenerTodos = async () => await TipoActividad.findAll();

// Obtener un tipo de actividad por ID
const obtenerPorId = async (idTipo) => await TipoActividad.findByPk(idTipo);

// Actualizar un tipo de actividad
const actualizarTipoActividad = async (idTipo, nuevosDatos) => {
  const tipo = await TipoActividad.findByPk(idTipo);
  if (!tipo) return null;
  return await tipo.update(nuevosDatos);
};

// Eliminar un tipo de actividad
const eliminarTipoActividad = async (idTipo) => {
  const tipo = await TipoActividad.findByPk(idTipo);
  if (!tipo) return null;
  await tipo.destroy();
  return true;
};

// Exportamos los services
module.exports = {
  crearTipoActividad,
  obtenerTodos,
  obtenerPorId,
  actualizarTipoActividad,
  eliminarTipoActividad,
};
