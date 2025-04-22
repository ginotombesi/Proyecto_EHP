const { DataTypes } = require('sequelize');
const sequelize = require('../persistence/db');
const Actividad = require('./actividadModel');

// Definición del modelo para la tabla INSCRIPCION
const Inscripcion = sequelize.define('INSCRIPCION', {
  dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // ✅ parte de la PK compuesta
  },
  actividad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // ✅ parte de la PK compuesta
    references: {
      model: Actividad,
      key: 'idActividad',
    },
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  talle: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'INSCRIPCION',
  timestamps: false,
  freezeTableName: true,
});

module.exports = Inscripcion;
