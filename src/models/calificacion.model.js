import mongoose from "mongoose";

const calificacionSchema = new mongoose.Schema({
    alumnoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Alumno",
        required:true
    },
    materiaId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Materia",
        required:true
    },
    calificacion : {
        type: Number,
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model("Calificaciones",calificacionSchema);