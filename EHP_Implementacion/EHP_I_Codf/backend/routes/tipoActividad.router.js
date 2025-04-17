const express = require('express');
const tipoActividadService = require('../services/tipoActividad.service.js');

const router = express.Router();

// Crear nuevo tipo de actividad
router.post('/', async (req, res) => {
    try {
        const nuevo = await tipoActividadService.crearTipoActividad(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los tipos de actividad
router.get('/', async (req, res) => {
    try {
        const tipos = await tipoActividadService.obtenerTodos();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un tipo de actividad por ID
router.get('/:idTipo', async (req, res) => {
    try {
        const tipo = await tipoActividadService.obtenerPorId(req.params.idTipo);
        if (!tipo) {
            return res.status(404).json({ error: 'Tipo no encontrado' });
        }
        res.json(tipo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un tipo de actividad
router.put('/:idTipo', async (req, res) => {
    try {
        const actualizado = await tipoActividadService.actualizarTipoActividad(req.params.idTipo, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Tipo no encontrado' });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un tipo de actividad
router.delete('/:idTipo', async (req, res) => {
    try {
        const eliminado = await tipoActividadService.eliminarTipoActividad(req.params.idTipo);
        if (!eliminado) {
            return res.status(404).json({ error: 'Tipo no encontrado' });
        }
        res.json({ mensaje: 'Tipo eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;