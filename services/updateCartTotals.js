import Cart from "../models/cartModel.js";
import Coupon from "../models/couponModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const updateCartTotals = async (cartId, couponCode = null) => {
  // Find the cart by ID
  const cart = await Cart.findById(cartId).populate('cartItems');
  if (!cart) {
    throw new ErrorHandler('Cart not found', 404);
  }

  cart.totalAmount = cart.cartItems.reduce((total, item) => total + item.price, 0);

  if (couponCode) {
    const coupon = await Coupon.findOne({ couponCode, status: 'active' });

    if (!coupon) {
      throw new ErrorHandler('Coupon not found or inactive', 404);
    }

    if (coupon.expiryDate < new Date()) {
      throw new ErrorHandler('Coupon has expired', 400);
    }

    if (coupon.usage >= coupon.usageLimit) {
      throw new ErrorHandler('Coupon usage limit reached', 400);
    }

    if (cart.totalAmount < coupon.minimumOrderAmount) {
      throw new ErrorHandler('Order amount does not meet the minimum requirement for this coupon', 400);
    }

    let discount = 0;

    if (coupon.isPercentage) {
      const percentage = coupon.type === "upto" ? Math.floor(Math.random() * coupon.discount) : coupon.discount;
      discount = Math.min((cart.totalAmount * percentage) / 100, coupon.maximumDiscountAmount);
    } else {
      discount = Math.min(coupon.discount, coupon.maximumDiscountAmount);
    }

    cart.discountedAmount = cart.totalAmount - Math.floor(discount);
    cart.couponCode = couponCode;
    cart.isDiscountAvailable = true;

  } else {
    cart.discountedAmount = cart.totalAmount;
    cart.couponCode = "";
    cart.isDiscountAvailable = false;
  }

  await cart.save();
  return cart;
};
