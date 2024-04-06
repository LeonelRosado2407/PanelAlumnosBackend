import mongoose  from "mongoose";

const materiaSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    calificacionAprobatoria:{
        type: Number,
        required: true 
    }
});

export default mongoose.model("Materia", materiaSchema);