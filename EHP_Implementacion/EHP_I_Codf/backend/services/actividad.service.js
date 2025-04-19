const { Op } = require("sequelize");
const sequelize = require("../persistence/db.js");
const Actividad = require("../models/actividadModel.js")

const TipoActividad = require("../models/tipoActividadModel.js");

// Relación: una actividad pertenece a un tipo de actividad
Actividad.belongsTo(TipoActividad, {
  foreignKey: 'tipoActividadId',
  targetKey: 'idTipo',
  as: 'tipoActividad'
});

const obtenerActividades = async function () {
  const actividades = await Actividad.findAll({
    include: {
      model: TipoActividad,
      as: 'tipoActividad',
      attributes: ['descripcion', 'requiereVest']
    }
  });
  return actividades;
};

module.exports = {
    obtenerActividades,
    // agregarActividad,
    // eliminarActividad,
};
