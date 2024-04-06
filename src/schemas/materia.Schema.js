import {z} from "zod";

export const materiaSchema = z.object({
    nombre: z.string({
        required_error: "Nombre is required"
    }),
    calificacionAprobatoria: z.number({
        required_error: "CalificacionAprobatoria is required",
        max: 10,
    })
})