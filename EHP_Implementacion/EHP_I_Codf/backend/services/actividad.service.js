const { Op } = require("sequelize");
const sequelize = require("../persistence/db.js");
const Actividad = require("../models/actividadModel.js");
const { format, parse  } = require('date-fns');  // Importamos date-fns para formatear las fechas

const TipoActividad = require("../models/tipoActividadModel.js");

// Relación: una actividad pertenece a un tipo de actividad
Actividad.belongsTo(TipoActividad, {
  foreignKey: 'tipoActividadId',
  targetKey: 'idTipo',
  as: 'tipoActividad'
});
const obtenerActividadPorId = async (id) => {
  return await Actividad.findOne({ where: { idActividad: id } });
};
const obtenerActividades = async function () {
  const actividades = await Actividad.findAll({
    include: {
      model: TipoActividad,
      as: 'tipoActividad',
      attributes: ['descripcion', 'requiereVest']
    }
  });

  // Formateamos las fechas antes de enviarlas al frontend
  return actividades.map((actividad) => {
    // Comprobamos si las fechas son válidas
    const validFecha = !isNaN(new Date(actividad.fecha).getTime());
  
    // Si las fechas no son válidas, dejamos un valor por defecto
    const formattedFecha = actividad.fecha
  ? format(parse(actividad.fecha, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')
  : 'Fecha inválida';
    
    const formattedHoraInicio = actividad.horaInicio || 'Hora de inicio inválida';

    const formattedHoraFin =  actividad.horaFin || 'Hora de fin inválida';
    // Retornamos una nueva actividad con las fechas formateadas
    
    return {
      ...actividad.toJSON(),
      fecha: formattedFecha,
      horaInicio: formattedHoraInicio,
      horaFin: formattedHoraFin,
    };
  });
};

module.exports = {
  obtenerActividades,
  obtenerActividadPorId
};














// Easter egg !!1