import { Router } from "express";

import { getCalificaciones } from "../controllers/calificaiones.controller.js";

const router = Router();

router.get("/calificaciones",getCalificaciones)

export default router;