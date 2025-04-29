import express from 'express';
import { getAllUsers } from '../controllers/Users.js';

const router = express.Router();

router.get('/users', getAllUsers);

export default router;