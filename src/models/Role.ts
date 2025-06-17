import { Document, model, Schema, Types } from "mongoose";

export interface IRole extends Document {
    _id:Types.ObjectId;
    name:string;
    type:string;
    //Usar siempre los 3 de abajo para todos los proyectos
    status:boolean;
    //createDate:Date;fecha de creacion
    //deleteDate:Date; Se utiliza para la fecha que el status sea inactivo 
}

const userSchema = new Schema<IRole>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        required:true,
        
    },
    status:{
        type:Boolean,
        required:true,
    },
    
});

export const Order=model<IRole>('Role', userSchema, 'role') //'order' es el nombre de la conexion