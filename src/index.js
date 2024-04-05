import App from "./app.js";
import {connectDB}  from "./db.js";

connectDB();

App.listen(3000);

console.log("Server is on: http://localhost:3000/");