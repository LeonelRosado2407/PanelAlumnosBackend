import { Router } from "express";

import { 
    getCalificaciones,
    getCalificacion,
    getCalificacionByAlumno,
    addCalificacion,
    updateCalificacion,
    deleteCalificacion,
    deleteCalificacionesByAlumno
} from "../controllers/calificaciones.controller.js";

import { validateschema } from "../middlewares/validator.middleware.js";
import {calificacionSchema} from "../schemas/calificacion.Schema.js";

const router = Router();

router.get("/getCalificaciones",getCalificaciones);
router.get("/getCalificacion/:id",getCalificacion);
router.get("/getCalificacionByAlumno/:id",getCalificacionByAlumno);
router.post("/addCalificacion",validateschema(calificacionSchema),addCalificacion);
router.put("/updateCalificacion/:id",validateschema(calificacionSchema),updateCalificacion);
router.delete("/deleteCalificacion/:id",deleteCalificacion);
router.delete("/deleteCalificacionesByAlumno/:id",deleteCalificacionesByAlumno);

export default router;