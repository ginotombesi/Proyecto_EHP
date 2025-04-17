const { Op } = require("sequelize");
const sequelize = require("../persistence/db.js");
const Actividad = require("../models/actividadModel.js")

const obtenerActividades = async function () {
    const actividades = await Actividad.findAll();
    return actividades;
  };

module.exports = {
    obtenerActividades,
    // agregarActividad,
    // eliminarActividad,
};
