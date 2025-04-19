const Actividad = require('./actividadModel');
const TipoActividad = require('./tipoActividadModel');

// Asociación
Actividad.belongsTo(TipoActividad, {
  foreignKey: 'tipoActividadId', // nombre en tu modelo (ojo, no 'tipoAct' que es solo a nivel DB)
  targetKey: 'idTipo',
});