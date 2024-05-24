import express from 'express';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
import { applyCoupon, createCoupon, deleteCoupon, getAllCoupons, getCouponById, updateCoupon } from '../controllers/couponController.js';
const router = express.Router();


// Coupon Routes
router.post('/', isAuthenticatedUser, authorizeRoles("admin"), createCoupon);
router.get('/', getAllCoupons);
router.get('/:id', getCouponById);
router.put('/:id', isAuthenticatedUser, authorizeRoles("admin"), updateCoupon);
router.delete('/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteCoupon);
router.post('/apply', isAuthenticatedUser, applyCoupon);

export default router;