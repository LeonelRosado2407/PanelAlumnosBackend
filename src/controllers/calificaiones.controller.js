

export const getCalificaciones = async(req,res) =>{
    try {
        res.json({
            message : "Calificaciones"
        });
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}