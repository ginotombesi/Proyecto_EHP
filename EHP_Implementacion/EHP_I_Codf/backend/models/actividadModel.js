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
        field: 'tipoAct',
        references: {
            model: TipoActividad,
            key: 'idTipo',
        },
    },
    horaInicio: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
    horaFin: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
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
    descripcion: {
        type : DataTypes.TEXT,
    }
}, {
    tableName: 'ACTIVIDAD',
    timestamps: false,
    freezeTableName: true,
});

module.exports = Actividad;
