// models/Products.ts
import { Document, model, Schema, Types } from "mongoose";

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    descri: string;
    qty: number;
    price: number;
    status: boolean;
    createDate: Date;
    deleteDate: Date;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    descri: {
        type: String,
        required: true,
        unique: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date
    }
});

export const Product = model<IProduct>('Product', productSchema, 'product'); // 'product' es la colección
