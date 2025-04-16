const { DataTypes } = require('sequelize');
const sequelize = require('../persistence/db');
const { default: TipoActividad } = require('./tipoActividadModel');

const Actividad = sequelize.define('ACTIVIDAD', {
    idActividad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
  },
    tipoActividadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoActividad,
            key: 'idTipo',},
        },
   horarios: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cupoMax: {
        type: DataTypes.INTEGER,
    },
    activa: {
        type: DataTypes.INTEGER,
    },
    tableName: 'ACTIVIDAD',
    timestamps: false,
   },);

module.exports = Actividad;
