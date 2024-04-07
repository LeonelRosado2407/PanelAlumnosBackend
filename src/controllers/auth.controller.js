import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../config.js";

export const register = async (req,res) =>{
    const { username, email, password } = req.body;

    try {

        const userFound = await User.findOne({email});

        if (userFound) return res.status(400).json(["User already exists"]);

        const passwordHash = await bcrypt.hash(password,10);
        
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });
        
        const userSaved = await newUser.save();

        const token = await createAccessToken({id : userSaved._id});

        res.cookie("access_token",token);

        res.json({
            message : "User registered" ,
            id : userSaved._id,
            username : userSaved.username,
            email : userSaved.email,
            createdAt : userSaved.createdAt,
            updatedAt : userSaved.updatedAt
        });

    } catch (error) {

        res.status(500).json([error.message]);
    }
}

export const login = async(req,res)  =>{
    const { username, email, password } = req.body;

    try {
        const userFound =  await User.findOne({email})

        if(!userFound) return res.status(400).json(["User not found"]);

        const isMatch = await bcrypt.compare(password,userFound.password);
        
        if(!isMatch) return res.status(400).json(["Invalid credentials"]);

        const token = await createAccessToken({id : userFound._id});

        res.cookie("access_token",token);

        res.json({
            message : "User Loggin in" ,
            id : userFound._id,
            username : userFound.username,
            email : userFound.email,
            createdAt : userFound.createdAt,
            updatedAt : userFound.updatedAt
        });

    } catch (error) {

        res.status(500).json([error.message]);
    }
}

export const logout = (req,res) =>{
   res.cookie('access_token',"",{
    expires : new Date(0)
   });

   return res.status(200).json({message : "User logged out"});
}

export const profile = async (req,res)=>{

    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json( ["User not found"]);

    res.json({
        message : "User Profile" ,
        id : userFound._id,
        username : userFound.username,
        email : userFound.email,
        createdAt : userFound.createdAt,
        updatedAt : userFound.updatedAt
    });
}

export const veifyToken = async (req,res) =>{
    const {access_token} = req.cookies;

    if (!access_token) return res.status(401).json(["Unauthorized"]);
    
    jwt.verify(access_token,TOKEN_SECRET_KEY,async (err,user)=>{

        if(err) return res.status(401).json(["Unauthorized"]);
        
        const userFound  = await User.findById(user.id);

        if (!userFound) return res.status(400).json( ["User not found"]);

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    })

}