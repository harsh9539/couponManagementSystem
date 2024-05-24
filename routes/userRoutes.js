import express from 'express';
import { testUserApi } from '../controllers/userControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';


const router = express.Router();


router.get('/', isAuthenticatedUser, testUserApi);


export default router;