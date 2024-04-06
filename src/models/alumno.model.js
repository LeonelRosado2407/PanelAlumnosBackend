import mongoose  from "mongoose";

const alumnoSchema = new mongoose.Schema({
    nombres:{
        type : String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    edad :{
        type: Number,
        required: true,
    },
    grado :{
        type: Number,
        required: true,
    },

},{
    timestamps: true
});

export default mongoose.model("Alumno", alumnoSchema);