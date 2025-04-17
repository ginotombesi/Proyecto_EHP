const appExpress = require("express");
const actividadesService = require("../services/actividad.service.js")

const actividadRouter = appExpress.Router();

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

module.exports = actividadRouter;


