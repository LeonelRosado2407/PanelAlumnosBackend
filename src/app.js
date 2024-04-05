import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import calificaionesRoutes from "./routes/calificaciones.routes.js"

const App = express();

App.use(morgan("dev"));
App.use(express.json());
App.use(cookieParser());

App.use('/api',authRoutes);
App.use('/api',calificaionesRoutes);

export default App;

