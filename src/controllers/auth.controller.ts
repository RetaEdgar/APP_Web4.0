import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateToken";
import { cache } from "../utils/cache";
import dayjs from "dayjs";
import { User } from "../models/User";
import { Types } from "mongoose";

//tengo mi variable y luego 2 puntos (:) se le agrega un TIPO de dato 
//Mi variable y luego un igual (=), se le agrega un VALOR
export const login = (req:Request, res:Response) => {
    let name: string= "Edgar";

    const {username, password}=req.body;

    if(username!=='Admin' || password!=='123456789'){
        return res.status(401)
        .json({ message: "Credenciales Incorrectas" })
        //401 y 403 error de credenciales
        //404
        //426 error personalizado
        //413 peticion mas grande
    }
    const userId = 'abc123';

    const accessToken = generateAccessToken(userId); 
    
    cache.set(userId,accessToken,60*15);  //set. La llave sirve como identificador, llave unica, puede ser el usuarioId ya que no se repite, en value se guarda el token, en ttl es el tiempo de vida 
    
return res.json({
    message: 'Login',
    accessToken
})
}

export const getTime = (req: Request, res: Response) => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);

    if (!ttl){
        return res.status(404)
            .json({ message: "Token no encontrado"})

    }

    const now=Date.now();
    const timeToLifeSeconds=Math.floor((ttl-now)/1000);
    const expTime=dayjs(ttl).format('HH:mm:ss');

    return res.json({
        timeToLifeSeconds,
        expTime
    })
}
export const updateTime = (req: Request, res: Response) => {
    const {userId} = req.body ;
    const ttl = cache.getTtl (userId);
    if (!ttl){
        return res.status (404) 
        .json({message: 'Token no encontrado o expirado'});
    }
    const nuevaTTLsegundos = 60 * 10;
    cache.ttl(userId, nuevaTTLsegundos); // metodo pra actualizar el token 

    res.json("Actualizado con exito");
};

export const getAllUsers=async (req:Request,res:Response) =>{
    const  userList = await User.find()//Buscar todos los registros
    //const  userList = await User.find({ status:true})  Buscar todos los registros con status activo

    return res.json({ userList });

};

export const getByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export const createUser= async (req:Request, res:Response) => {
    try{
        const {username,password, email,role} = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUSer= new User({
            username,
            password: hashedPassword,
            role,
            email,
            status : true
        });

        const user= await newUSer.save();
        return res.json({ user})
    }catch(error){
        console.log("Error ocurrido en createUser", error);
        return res.status(426).json({error})
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({ message: "Usuario actualizado con éxito", user: updatedUser });
    } catch (error) {
        console.error("Error en updateUser:", error);
        return res.status(500).json({ message: "Error al actualizar usuario", error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const deletedUser = await User.findByIdAndUpdate(
            id,
            {
                status: false,
                deleteDate: new Date()
            },
            { new: true }
        );

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({ message: "Usuario desactivado correctamente", user: deletedUser });
    } catch (error) {
        console.error("Error en deleteUser:", error);
        return res.status(500).json({ message: "Error al desactivar usuario", error });
    }
};

