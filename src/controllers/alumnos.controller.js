import Alumno from "../models/alumno.model.js";

export const getAlumnos = async (req,res) =>{
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        res.status(500).json([error.message]);
    }
}

export const getAlumno = async (req,res) =>{
    try {
        const {id} = req.params;
        const alumnoFound = await Alumno.findById(id);
        res.json(alumnoFound);
    } catch (error) {
        res.status(500).json([error.message]);
    }
}

export const addAlumno = async (req,res) =>{
    try {
        const {nombres,apellidos,edad,grado} = req.body;

        const newAlumno = new Alumno({
            nombres,
            apellidos,
            edad,
            grado
        });

        const alumnoSaved = await newAlumno.save();
        res.json(alumnoSaved);

    } catch (error) {
        res.status(500).json([error.message]);
    }
}

export const updateAlumno = async (req,res) =>{
    try {
        const {id} = req.params;
        const alumno = req.body;
        const alumnoUpdated = await Alumno.findByIdAndUpdate(id,alumno,{new: true});

        res.json({
            message: "El alumno se ha actualizado correctamente",
            alumnoUpdated
        });

    } catch (error) {
        res.status(500).json([error.message]);
    }
}

export const deleteAlumno = async (req,res) =>{
    try {
        const {id} =req.params;
        await Alumno.findByIdAndDelete(id);
        res.json({
            message: "El alumno se ha eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json([error.message]);
    }
}