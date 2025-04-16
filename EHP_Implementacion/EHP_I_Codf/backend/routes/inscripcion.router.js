// routes/inscripcionRoutes.js

const express = require('express');
const router = express.Router();
const inscripcionService = require('../services/inscripcion.service.js');

// Crear inscripción
router.post('/reserve', async (req, res) => {
    try {
        const nueva = await inscripcionService.crearInscripcion(req.body);
        res.status(201).json(nueva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todas las inscripciones
router.get('/reserve', async (req, res) => {
    try {
        const inscripciones = await inscripcionService.obtenerTodas();
        res.json(inscripciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener inscripción por DNI
router.get('/reserve/:dni', async (req, res) => {
    try {
        const inscripcion = await inscripcionService.obtenerPorDni(req.params.dni);
        if (!inscripcion) {
            return res.status(404).json({ error: 'No encontrada' });
        }
        res.json(inscripcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar inscripción
router.put('/reserve/:dni', async (req, res) => {
    try {
        const actualizada = await inscripcionService.actualizarInscripcion(req.params.dni, req.body);
        if (!actualizada) {
            return res.status(404).json({ error: 'No encontrada' });
        }
        res.json(actualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar inscripción
router.delete('/reserve/:dni', async (req, res) => {
    try {
        const eliminado = await inscripcionService.eliminarInscripcion(req.params.dni);
        if (!eliminado) {
            return res.status(404).json({ error: 'No encontrada' });
        }
        res.json({ mensaje: 'Inscripción eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
