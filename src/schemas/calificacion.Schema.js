import {z} from 'zod';

export const calificacionSchema = z.object({
    alumnoId :z.string({
        required_error: "El alumnoId es requerido"
    }),
    materiaId :z.string({
        required_error: "El materiaId es requerido"
    }),
    calificacion : z.number({
        required_error: "La calificacion es requerida"
    })
})
