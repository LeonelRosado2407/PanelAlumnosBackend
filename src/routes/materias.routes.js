import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
    addMateria, 
    deleteMateria, 
    getMateria, 
    getMaterias, 
    updateMateria 
} from "../controllers/Materias.controller.js";
import { validateschema } from "../middlewares/validator.middleware.js";
import { materiaSchema } from "../schemas/materia.Schema.js";

const router = Router();

router.get("/getMaterias",authRequired, getMaterias);
router.get("/getMateria/:id",authRequired,getMateria);
router.post("/addMateria",authRequired,validateschema(materiaSchema),addMateria);
router.put("/updateMateria/:id",authRequired,validateschema(materiaSchema),updateMateria);
router.delete("/deleteMateria/:id",authRequired,deleteMateria);

export default router;