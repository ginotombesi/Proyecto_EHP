const Actividad = require('./actividadModel');
const TipoActividad = require('./tipoActividadModel');

// Asociación
Actividad.belongsTo(TipoActividad, {
  foreignKey: 'tipoActividadId',
  targetKey: 'idTipo',
});