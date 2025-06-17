import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Types } from "mongoose";

// ✅ Crear una nueva orden
export const createOrder = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        // Calcular subtotal y total
        const subtotal = payload.products.reduce((acc: number, item: any) => acc + item.qty * item.price, 0);
        const total = subtotal; // Puedes agregar impuestos u otros cargos si lo deseas

        const newOrder = new Order({
            ...payload,
            subtotal,
            total,
            createDate: new Date(),
            status: "activo", // o cualquier valor por defecto
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la orden", error });
    }
};

// ✅ Obtener todas las órdenes activas
export const getOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await Order.find({ status: "activo" }).populate("products.productId");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las órdenes", error });
    }
};

// ✅ Obtener una orden por ID
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const order = await Order.findById(id).populate("products.productId");

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la orden", error });
    }
};

// ✅ Actualizar una orden
// Cambiar el estado de una orden a "PAGADO" o "NO PAGADO"
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        if (status !== "PAGADO" && status !== "NO PAGADO") {
            return res.status(400).json({ message: "El status debe ser 'PAGADO' o 'NO PAGADO'" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json({ message: `Estado actualizado a ${status}`, orden: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar orden", error });
    }
};


// ✅ Eliminación lógica de orden (cambia status y guarda deleteDate)
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const deletedOrder = await Order.findByIdAndUpdate(
            id,
            { status: "inactivo", deleteDate: new Date() },
            { new: true }
        );

        if (!deletedOrder) {
            return res.status(404).json({ message: "Orden no encontrada para eliminar" });
        }

        res.json({ message: "Orden eliminada lógicamente", orden: deletedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la orden", error });
    }
};
