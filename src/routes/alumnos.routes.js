import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { 
    getAlumnos,
    getAlumno,
    addAlumno,
    updateAlumno,
    deleteAlumno 
} from "../controllers/alumnos.controller.js";
import { validateschema } from "../middlewares/validator.middleware.js";
import { AlumnoSchema } from "../schemas/alumnos.schema.js";

const router = Router();

router.get("/getAlumnos",authRequired, getAlumnos);
router.get("/getAlumno/:id",authRequired,getAlumno);
router.post("/addAlumno",authRequired,validateschema(AlumnoSchema),addAlumno);
router.put("/updateAlumno/:id",authRequired,validateschema(AlumnoSchema),updateAlumno);
router.delete("/deleteAlumno/:id",authRequired,deleteAlumno);

export default router;
