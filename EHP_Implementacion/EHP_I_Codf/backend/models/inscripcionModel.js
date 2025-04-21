const { DataTypes } = require('sequelize');
const sequelize = require('../persistence/db');
const { Actividad } = require('./actividadModel');

const Inscripcion = sequelize.define('INSCRIPCION', {
    dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    tableName: 'INSCRIPCION',
    timestamps: false,
    freezeTableName: true,

    // 👇 Clave única compuesta
    indexes: [
        {
            unique: true,
            fields: ['dni', 'actividad']
        }
    ]
});

module.exports = Inscripcion;
