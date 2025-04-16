// services/tipoActividadService.js
const {TipoActividad} = require('../models/tipoActividadModel.js');

const crearTipoActividad = async (datos) => {
    return await TipoActividad.create(datos);
};

const obtenerTodos = async () => {
    return await TipoActividad.findAll();
};

const obtenerPorId = async (idTipo) => {
    return await TipoActividad.findByPk(idTipo);
};

const actualizarTipoActividad = async (idTipo, nuevosDatos) => {
    const tipo = await TipoActividad.findByPk(idTipo);
    if (!tipo) return null;
    return await tipo.update(nuevosDatos);
};

const eliminarTipoActividad = async (idTipo) => {
    const tipo = await TipoActividad.findByPk(idTipo);
    if (!tipo) return null;
    await tipo.destroy();
    return true;
};

module.exports =  {
    crearTipoActividad,
    obtenerTodos,
    obtenerPorId,
    actualizarTipoActividad,
    eliminarTipoActividad
}