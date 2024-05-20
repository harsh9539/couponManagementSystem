import express from 'express';
import { testUserApi } from '../controllers/userControllers.js';

const router = express.Router();


router.get('/', testUserApi);


export default router;