import express from 'express';
import { getAllUsers, login, Register } from '../controllers/Users.js';
import { verifikasiToken } from '../middleware/token.js';
import { refreshToken } from '../controllers/retoken.js';


const router = express.Router();

router.get('/users', getAllUsers);
router.post('/register', Register);
router.post('/login',login);
router.get('/token',refreshToken);


export default router;