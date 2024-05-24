import express from 'express';
import { isAuthenticatedUser } from '../middlewares/auth.js';
import { createOrUpdateCart, getCart } from '../controllers/cartController.js';


const router = express.Router();


router.post("/add", isAuthenticatedUser, createOrUpdateCart)
router.get('/', isAuthenticatedUser, getCart);


export default router;