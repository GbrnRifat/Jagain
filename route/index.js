import express from 'express';
import { getAllUsers, login, logout, Register } from '../controllers/Users.js';



const router = express.Router();

router.get('/users', getAllUsers);
router.post('/register', Register);
router.post('/login',login);
router.get('/logout',logout);


export default router;