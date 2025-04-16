const { DataTypes } = require('sequelize');
const sequelize = require('../persistence/db');
const { Actividad } = require('./actividadModel');

const Inscripcion = sequelize.define('Inscripcion', {

    dni : {
        type: DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true,
    },
    nombre : {
        type : DataTypes.TEXT,
        allowNull: false,
    },
    fechaNacimiento : {
        type : DataTypes.TEXT,
        allowNull:false
    },

    actividad : {
        type : DataTypes.INTEGER,
        references : {
            model: Actividad,
            key: "idActividad"
        },
        allowNull:false
    },

    talle : {
        type : DataTypes.TEXT
    }

})

module.exports = Inscripcion;

