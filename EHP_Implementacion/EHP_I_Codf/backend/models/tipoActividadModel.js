const { DataTypes } = require("sequelize");
const sequelize = require("../persistence/db.js");

const TipoActividad = sequelize.define("TipoActividad", {

    idTipo: {
        type: DataTypes.Integer,
        primaryKey: true,
        autoIncrement: true,
        field: "idTipo",
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "descripcion",
    },
    requiereVest: {
        type: DataTypes.Integer,
        field: "requiereVest"
    }
},{
      timestamps: false,
      tableName: "TipoActividad",
});

module.exports = TipoActividad;