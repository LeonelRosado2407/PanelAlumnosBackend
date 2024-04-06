import { Router } from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateschema } from "../middlewares/validator.middleware.js";
import { loginSchema , registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateschema(registerSchema), register);
router.post("/login", validateschema(loginSchema), login);
router.post("/logout",logout); 
router.get("/profile",authRequired, profile );

export default router;