import { Document, model, Schema, Types } from "mongoose";

interface IOrderProduct {
    productId: Types.ObjectId;
    qty: number;
    price: number;
}

export interface IOrder extends Document {
    _id:Types.ObjectId;
    idUser:string
    total: number;
    subtotal: number;
    //Usar siempre los 3 de abajo para todos los proyectos
    status:string;
    createDate:Date;//fecha de creacion
    deleteDate:Date; //Se utiliza para la fecha que el status sea inactivo 
    products: IOrderProduct[];
}
const orderProductSchema = new Schema<IOrderProduct>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    qty: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {_id: false });

const userSchema = new Schema<IOrder>({
    idUser:{
        type:String,
        required:true,
    },
    total: {
        type: Number,
        required: true


    },
    subtotal: {
        type: Number,
        required: true
    },
    products:{
        type: [orderProductSchema],
        required: true,
        validate: [(array: string | any[]) => array.length > 0, 'Debe contener al menos un producto']
    },
  
    status:{
        type:String,
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

export const Order=model<IOrder>('Order', userSchema, 'order') //'order' es el nombre de la conexion