import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import calificaionesRoutes from "./routes/calificaciones.routes.js"
import materiasRoutes from "./routes/materias.routes.js";
import alumnosRoutes from "./routes/alumnos.routes.js";
import cors from "cors";

const App = express();
App.use(cors());
App.use(morgan("dev"));
App.use(express.json());
App.use(cookieParser());

App.use('/api',authRoutes);
App.use('/api',calificaionesRoutes);
App.use('/api',materiasRoutes);
App.use('/api',alumnosRoutes);

export default App;

