import { Document, model, Schema, Types } from "mongoose";

export interface IUser extends Document {
    _id:Types.ObjectId;
    username:string;
    password:string;
    role:string;
    email:string;
    //Usar siempre los 3 de abajo para todos los proyectos
    status:boolean;
    createDate:Date;//fecha de creacion
    deleteDate:Date; //Se utiliza para la fecha que el status sea inactivo 
}

const userSchema = new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    },
    createDate:{
        type:Date,
        default: Date.now,

    },
    deleteDate:{
        type:Date
    }
});

export const User=model<IUser>('User', userSchema, 'user') //'user' es el nombre de la conexion