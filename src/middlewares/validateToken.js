import jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '../config.js';

export const authRequired = (req,res,next) =>{
    const {access_token} = req.cookies;
    if(!access_token) return res.status(401).json({message : "No se encontró un Token de acceso, por favor inicie sesión"});

    jwt.verify(access_token,TOKEN_SECRET_KEY,(err,decoded) =>{
        if(err) return res.status(401).json({message : "Token Inválido"});
        req.user = decoded;
    })
    next();
} 