const { DataTypes } = require('sequelize');
const sequelize = require('../persistence/db');
const { Actividad } = require('./actividadModel');

const Inscripcion = sequelize.define('INSCRIPCION', {
    dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    actividad: {
        type: DataTypes.INTEGER,
        references: {
            model: Actividad,
            key: "idActividad"
        },
        allowNull: false
    },
    talle: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'INSCRIPCION',         // 👈 esto va como segundo parámetro
    timestamps: false,
    freezeTableName: true
});

module.exports = Inscripcion;
