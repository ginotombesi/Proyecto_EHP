// services/inscripcionService.js
const Actividad = require('../models/actividadModel'); // 👈 Importar el modelo de actividad

const Inscripcion = require('../models/inscripcionModel');

const crearInscripcion = async (datos) => {
    const { actividad } = datos;
    const yaInscripto = await Inscripcion.findOne({
        where: {
          dni: datos.dni,
          actividad: datos.actividad
        }
      });
      if (yaInscripto) throw new Error('Ya estás inscripto en esta actividad');
    // Paso 1: Buscar la actividad
    const act = await Actividad.findOne({ where: { idActividad: actividad } });
    if (!act) throw new Error('Actividad no encontrada');
  
    // Paso 2: Validar que haya cupo
    console.log(act.cupo)
    if (act.cupo <= 0) throw new Error('No hay cupos disponibles');
  
    // Paso 3: Crear la inscripción
    const nuevaInscripcion = await Inscripcion.create(datos);
  
    // Paso 4: Descontar 1 del cupo
    act.cupo -= 1;
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
