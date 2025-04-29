import express from 'express';
import { getAllUsers, Register } from '../controllers/Users.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/register', Register);

export default router;