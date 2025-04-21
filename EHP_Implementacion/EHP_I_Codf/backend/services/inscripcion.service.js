// services/inscripcionService.js
const Actividad = require('../models/actividadModel');
const Inscripcion = require('../models/inscripcionModel');

const crearInscripcion = async (datos) => {
  const { actividad } = datos;

  // Verificar inscripción previa
  const yaInscripto = await Inscripcion.findOne({
    where: { dni: datos.dni, actividad: datos.actividad }
  });
  if (yaInscripto) throw new Error('Ya estás inscripto en esta actividad');

  // Paso 1: Buscar la actividad
  const act = await Actividad.findOne({ 
    
    where: { idActividad: actividad }, 
    include: {
    model: TipoActividad,
    as: 'tipoActividad'
  }});
  if (!act) throw new Error('Actividad no encontrada');

  // Paso 2: Validar que haya cupo
  if (act.cupo <= 0) throw new Error('No hay cupos disponibles');

  // Paso 3: Crear la inscripción
  const nuevaInscripcion = await Inscripcion.create(datos);

  // Paso 4: Descontar 1 del cupo
  act.cupo -= 1;

  // Paso 5: Marcar inactiva si el cupo llegó a cero
  if (act.cupo === 0) {
    act.activa = 0;  // o `false`, según cómo lo tengas definido en el modelo
  }

  await act.save();

  return nuevaInscripcion;
};

const obtenerTodas = async () => {
  return await Inscripcion.findAll();
};

module.exports = {
  crearInscripcion,
  obtenerTodas,
};
