const express = require('express');
const inscripcionRouter = express.Router();
const inscripcionService = require('../services/inscripcion.service.js');

// Crear inscripción
inscripcionRouter.post('/:id', async (req, res) => {
    try {
      const datos = {
        ...req.body,
        actividad: parseInt(req.params.id) 
      };
  
      const nueva = await inscripcionService.crearInscripcion(datos);
      res.status(201).json(nueva);
    } catch (error) {
      console.error('❌ Error creando inscripción:', error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Obtener todas las inscripciones
inscripcionRouter.get('/', async (req, res) => {
    try {
        const inscripciones = await inscripcionService.obtenerTodas();
        res.json(inscripciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener inscripción por DNI
// inscripcionRouter.get('/:dni', async (req, res) => {
//     try {
//         const inscripcion = await inscripcionService.obtenerPorDni(req.params.dni);
//         if (!inscripcion) {
//             return res.status(404).json({ error: 'No encontrada' });
//         }
//         res.json(inscripcion);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Actualizar inscripción
// inscripcionRouter.put('/:dni', async (req, res) => {
//     try {
//         const actualizada = await inscripcionService.actualizarInscripcion(req.params.dni, req.body);
//         if (!actualizada) {
//             return res.status(404).json({ error: 'No encontrada' });
//         }
//         res.json(actualizada);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Eliminar inscripción
// inscripcionRouter.delete('/:dni', async (req, res) => {
//     try {
//         const eliminado = await inscripcionService.eliminarInscripcion(req.params.dni);
//         if (!eliminado) {
//             return res.status(404).json({ error: 'No encontrada' });
//         }
//         res.json({ mensaje: 'Inscripción eliminada' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = inscripcionRouter;
