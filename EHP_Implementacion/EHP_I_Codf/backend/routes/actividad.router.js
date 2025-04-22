const express = require("express");
const actividadesService = require("../services/actividad.service.js")

const actividadRouter = express.Router();

// Obtener todas las actividades
actividadRouter.get("/", async (req, res) => {
    try{
        let actividades = null;
        actividades = await actividadesService.obtenerActividades();
        res.json(actividades);
    }
    catch (error){
        console.log(error);
        res
            .status(500)
            .json({error: "Database error obteniendo actividades"});
    }
})

// Obtener actividad por ID
actividadRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const actividad = await actividadesService.obtenerActividadPorId(id);
        if (!actividad) {
            return res.status(404).json({ error: "Actividad no encontrada" });
        }
        res.json(actividad);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo actividad por ID" });
    }
});


module.exports = actividadRouter;


