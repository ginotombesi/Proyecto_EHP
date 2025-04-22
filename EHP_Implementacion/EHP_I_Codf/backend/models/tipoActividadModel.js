const { DataTypes } = require('sequelize');
const sequelize = require('../persistence/db.js');

// Definición del modelo para la tabla TIPOACTIVIDAD
const TipoActividad = sequelize.define('TIPOACTIVIDAD', {

  idTipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idTipo',
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'descripcion',
  },
  requiereVest: {
    type: DataTypes.INTEGER,
    field: 'requiereVest',
  },
}, {
  timestamps: false,
  tableName: 'TIPOACTIVIDAD',
  freezeTableName: true,
});

module.exports = TipoActividad;
