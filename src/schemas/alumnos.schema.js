import {z} from "zod";

export const AlumnoSchema = z.object({
    nombres: z.string({
        required_error: 'Nombres is required'
    }),
    apellidos: z.string({
        required_error: 'Apellidos is required'
    }),
    edad: z.number({
        required_error: 'Edad is required'
    }),
    grado: z.number({
        required_error: 'Grado is required'
    }),
})