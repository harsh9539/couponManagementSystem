import express from 'express';
import { createTransaction, getAllTransactions, getTransactionById } from '../controllers/transactionController.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';


const router = express.Router();


router.get('/', isAuthenticatedUser, getAllTransactions);
router.get('/:id', isAuthenticatedUser, getTransactionById);
router.post("/start", isAuthenticatedUser, createTransaction);


export default router;