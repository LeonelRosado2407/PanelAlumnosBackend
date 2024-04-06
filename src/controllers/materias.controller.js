import Materia from "../models/materia.model.js"

export const getMaterias = async (req,res) =>{
   try {
    const materias = await Materia.find();
    res.json(materias);
   } catch (error) {
    res.status(500).json([error.message]);
   } 
}

export const getMateria = async (req,res) =>{
    try {
        const {id} = req.params;
        const materiaFound = await Materia.findById(id);
        res.json(materiaFound);
    } catch (error) {
        res.status(500).json([error.message]); 
    }
}

export const addMateria = async(req,res) =>{
    try {
        const {nombre,calificacionAprobatoria} = req.body;
        
        const newMateria = new Materia({
            nombre,
            calificacionAprobatoria
        });

        const materiaSaved = await newMateria.save();

        res.json(materiaSaved);

    } catch (error) {
        res.json([error.message]);
    }
}

export const updateMateria = async (req,res) =>{
    try {
        const {id} = req.params;

        const materia = req.body;

        console.log(materia);

        const materiaUpdated = await Materia.findByIdAndUpdate(id,materia,{new:true});

        res.json({
            message: "la materia se ha actualizado correctamente",
            materiaUpdated
        });

    } catch (error) {
        res.status(500).json([error.message]);
    }
}

export const deleteMateria = async (req,res) =>{
    try {
        const {id} = req.params;
        await Materia.findByIdAndDelete(id);
        res.json({
            message: "La materia se ha eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json([error.message]);
    }
}