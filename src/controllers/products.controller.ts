
import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Types } from "mongoose";

// Crear producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const newProduct = new Product({
            ...payload,
            createDate: new Date(),
            status: true,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

// Obtener todos los productos activos
export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.find({ status: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos", error });
    }
};

// Obtener producto por ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar producto", error });
    }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const updated = await Product.findByIdAndUpdate(id, payload, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
};

// Eliminar producto 
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const deleted = await Product.findByIdAndUpdate(
            id,
            { status: false, deleteDate: new Date() },
            { new: true }
        );

        if (!deleted) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado lógicamente", producto: deleted });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};
