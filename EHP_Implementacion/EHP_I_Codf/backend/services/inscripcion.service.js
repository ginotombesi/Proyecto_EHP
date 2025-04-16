// services/inscripcionService.js

const Inscripcion = require('../models/inscripcionModel');

const crearInscripcion = async (datos) => {
    return await Inscripcion.create(datos);
};

const obtenerTodas = async () => {
    return await Inscripcion.findAll();
};

const obtenerPorDni = async (dni) => {
    return await Inscripcion.findByPk(dni);
};

const actualizarInscripcion = async (dni, nuevosDatos) => {
    const inscripcion = await Inscripcion.findByPk(dni);
    if (!inscripcion) return null;
    return await inscripcion.update(nuevosDatos);
};

const eliminarInscripcion = async (dni) => {
    const inscripcion = await Inscripcion.findByPk(dni);
    if (!inscripcion) return null;
    await inscripcion.destroy();
    return true;
};

module.exports = {
    crearInscripcion,
    obtenerTodas,
    obtenerPorDni,
    actualizarInscripcion,
    eliminarInscripcion
};
