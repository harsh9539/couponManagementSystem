import express from 'express';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth';
import { applyCoupon, createCoupon, deleteCoupon, getAllCoupons, getCouponById } from '../controllers/couponController';
const router = express.Router();


// Coupon Routes
router.post('/coupons', isAuthenticatedUser, authorizeRoles("admin"), createCoupon);
router.get('/coupons', getAllCoupons);
router.get('/coupons/:id', getCouponById);
router.put('/coupons/:id', isAuthenticatedUser, authorizeRoles("admin"), updateCoupon);
router.delete('/coupons/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteCoupon);
router.post('/coupons/apply', isAuthenticatedUser, applyCoupon);

export default router;