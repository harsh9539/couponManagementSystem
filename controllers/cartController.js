import Cart from "../models/cartModel.js"
import catchAsyncErrors from "../middlewares/catchAsynErrors.js"
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/productModel.js";
import { updateCartTotals } from "../services/updateCartTotals.js";



// Create or update cart
// @route     GET /api/v1/cart/add
// @access    Private

export const createOrUpdateCart = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  const user = req.user.id;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let cart = await Cart.findOne({ user });

  if (!cart) {
    cart = new Cart({
      user,
      cartItems: [productId],
      totalAmount: product.price,
      discountedAmount: product.price,
    });
    await cart.save()
    res.status(201).json({
      success: true,
      message: 'Cart updated successfully',
      data: cart,
    });
  } else {
    const isProductInCart = cart.cartItems.includes(productId);

    if (!isProductInCart) {
      cart.cartItems.push(productId);
      cart.totalAmount += product.price;
      cart.discountedAmount += product.price;
      await cart.save()
      if (cart.couponCode !== "") {

        const updateCart = await updateCartTotals(cart.id, cart.couponCode)
        res.status(201).json({
          success: true,
          message: 'Cart updated successfully',
          data: updateCart,
        });
      }
    } else {
      return next(new ErrorHandler("Product is already in the cart", 400));
    }
  }
});



// Get cart
// @route     GET /api/v1/cart
// @access    Private

export const getCart = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId)
  const cart = await Cart.findOne({ user: userId }).populate('cartItems');

  if (!cart) {
    return next(new ErrorHandler("Cart not found for this user", 404));
  }

  res.status(200).json({
    success: true,
    data: cart,
  });

});