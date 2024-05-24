import express from 'express';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
import { getProductById, createProduct, updateProduct, deleteProduct, getAllProducts } from '../controllers/productController.js';


const router = express.Router();


router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post("/", isAuthenticatedUser, authorizeRoles('admin'), createProduct)
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);



export default router;