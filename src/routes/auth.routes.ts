import { Router } from "express";
import { createUser, getAllUsers, getByUsername, getTime, login, updateTime, updateUser, deleteUser } from "../controllers/auth.controller";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/order.controller";

import { createProduct, getProducts, getProductById, updateProduct,deleteProduct } from "../controllers/products.controller";

const router = Router();

router.post('/login-user', login);
router.get('/getTime/:userId', getTime);
router.put('/updateTime/', updateTime);
router.get('/users', getAllUsers);
router.get('/users/:username', getByUsername);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.put('/users/inactive/:id', deleteUser);

// 🟢 Rutas para CRUD de órdenes:
router.post('/order', createOrder);               
router.get('/orders', getOrders);                 
router.get('/orders/:id', getOrderById);          
router.put('/orders/:id', updateOrder);           
router.put('/orders/inactive/:id', deleteOrder);        

// Rutas para productos
router.post('/products', createProduct);             
router.get('/products', getProducts);                
router.get('/products/:id', getProductById);         
router.put('/products/:id', updateProduct);          
router.put('/products/inactive/:id', deleteProduct);       

export default router;
