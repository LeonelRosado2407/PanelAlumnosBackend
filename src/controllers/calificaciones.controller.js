import  Calificacion from '../models/calificacion.model.js';
import Alumno from '../models/alumno.model.js';
import Materia from '../models/materia.model.js';

export const getCalificaciones = async(req,res) =>{
    try {
        const calificaciones = await Calificacion.find();

        if (calificaciones == null) {
            return(
                res.status(404).json({
                    message : "No se encontraron calificaciones"
                })
            );
        }

        const newCalificacion = await Promise.all(
            calificaciones.map(async (calificacion) =>{
                const objectCalifiacion = await mapearCalificacion(calificacion);
                return objectCalifiacion;
            })
        ); 

        res.json(newCalificacion);

    } catch (error) {
        res.status(500).json([error.message]);
    }
}

export const getCalificacion = async (req,res) =>{
    try {
        const {id} = req.params;
        const calificacion = await Calificacion.findById(id);
        if (calificacion == null) return(res.status(404).json({message : "Calificacion no encontrada"}));
        const objectCalifiacion = await mapearCalificacion(calificacion);
        res.json(objectCalifiacion);
    } catch (error) {
        res.status(500).json([error.message]);
    }
}

export const getCalificacionByAlumno = async(req,res) =>{
    try {
        const {id} = req.params;

        const calificaciones = await Calificacion.find({alumnoId : id});
        const alumno  = await Alumno.findById(id);

        if (calificaciones == null || alumno == null) return(res.status(404).json({message : "Calificaciones no encontradas"}));

        const alumnoCalificaciones = await Promise.all(
            calificaciones.map(async (calificacion) =>{
                const objectCalifiacion = await mapearCalificacion(calificacion,false);
                return objectCalifiacion;
            })
        );

        res.json({
            alumno : alumno.nombres + " " + alumno.apellidos,
            calificaciones : alumnoCalificaciones
        });

    } catch (error) {
        
    }
}

export const addCalificacion = async(req,res) =>{
    try {
        const {alumnoId,materiaId,calificacion} = req.body;

        const calificaionExist = await Calificacion.findOne({alumnoId,materiaId});

        if (calificaionExist != null) {
            const editCalificacion = await Calificacion.findByIdAndUpdate(calificaionExist._id,{calificacion},{new: true});
            res.json(["se ha Guadrado la calificacion"]);
            return;
        }

        const newCalificacion = new Calificacion({
            alumnoId,
            materiaId,
            calificacion
        });

        const calificacionSaved = await newCalificacion.save();

        res.json(["se ha Guadrado la calificacion"]);

    } catch (error) {
        res.status(500).json([error.message]);
    }
}

export const updateCalificacion = async (req,res) =>{
    try{
        const {id} = req.params;
        const calificacion = req.body;
        const calificacionUpdated = await Calificacion.findByIdAndUpdate(id,calificacion,{new: true});
        res.json(["Calificacion actualizada"]);

    }catch(error){
        res.status(500).json([error.message]);
    }
}

export const deleteCalificacion  = async(req,res) =>{
    try {
        const {id} = req.params;
        await Calificacion.findByIdAndDelete(id);
        res.json(["Calificacion eliminada"]);
    } catch (error) {
        res.status(500).json([error.message]);
    }
}

export const deleteCalificacionesByAlumno = async(req,res) =>{
    try {
        const {id} = req.params;
        const calificaciones = await Calificacion.find({alumnoId : id});

        if (calificaciones == null || calificaciones.length == 0) return(res.status(404).json({message : "Calificaciones no encontradas"}));
        
        await Calificacion.find({alumnoId : id}).deleteMany();
        
        res.json(["Calificaciones eliminadas"]);

    } catch (error) {
        res.status(500).json([error.message]);
    }
}

const mapearCalificacion = async (calificacion,withAlumno = true) =>{
    const alumno = await Alumno.findById(calificacion.alumnoId);
    const materia = await Materia.findById(calificacion.materiaId);
    let reprobado = false;
    let cal = 0;
    
    if (alumno == null || materia == null) return {alumno : "No encontrado", materia : "No encontrada"};
    cal = parseInt(calificacion.calificacion);

    if (cal < materia.calificacionAprobatoria) {
        reprobado = true;
    }else{
        reprobado = false;
    }

    if (!withAlumno) {
        return {
            calificacionId: calificacion._id,
            materia : materia.nombre,
            materiaId: materia._id,
            calificacion : calificacion.calificacion,
            reprobado: reprobado
        }
    }

    return {
        calificacionId: calificacion._id,
        alumno : alumno.nombres + " " + alumno.apellidos,
        materia : materia.nombre,
        materiaId: materia._id,
        calificacion : calificacion.calificacion,
        reprobado: reprobado
    }
};
