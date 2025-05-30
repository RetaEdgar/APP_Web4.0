import { Router } from "express";
import { createUser, getAllUsers, getByUsername, getTime, login, updateTime } from "../controllers/auth.controller";

const router = Router();

router.post('/login-user', login);// Ruta del controlador o endpoint 
//Consulta get, delete eliminar, post crear? creo
router.get('/getTime/:userId', getTime);
router.put('/updateTime/', updateTime);
router.get('/users', getAllUsers);
router.get('/users/:username', getByUsername);
router.post('/users', createUser);


export default router;