import Cart from "../models/cartModel.js"
import catchAsyncErrors from "../middlewares/catchAsynErrors.js"
import ErrorHandler from "../utils/errorHandler.js";



// Create or update cart
// @route     GET /api/v1/cart/add
// @access    Private

export const createOrUpdateCart = catchAsyncErrors(async (req, res, next) => {
  const { product } = req.body;
  const user = req.user.id;

  let cart = await Cart.findOne({ user });

  if (!cart) {
    cart = new Cart({ user, cartItems: [product] });
  } else {
    const isProductInCart = cart.cartItems.includes(product);

    if (!isProductInCart) {
      cart.cartItems.push(product);
    } else {
      return next(new ErrorHandler("Product is already in the cart", 400));
    }
  }

  await cart.save();

  res.status(201).json({
    success: true,
    message: 'Cart updated successfully',
    data: cart,
  });
});



// Get cart
// @route     GET /api/v1/cart
// @access    Private

export const getCart = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate('cartItems');

  if (!cart) {
    return next(new ErrorHandler("Cart not found for this user", 404));
  }

  res.status(200).json({
    success: true,
    data: cart,
  });

});