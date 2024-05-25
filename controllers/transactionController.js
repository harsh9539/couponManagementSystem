import Cart from "../models/cartModel.js"
import Coupon from "../models/couponModel.js"
import catchAsyncErrors from "../middlewares/catchAsynErrors.js"
import ErrorHandler from "../utils/errorHandler.js";
import Transaction from "../models/transactionModel.js";



// Create a new transaction
export const createTransaction = catchAsyncErrors(async (req, res, next) => {
  const { cartId } = req.body;
  const cart = await Cart.findById(cartId);
  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }
  let coupon = null;
  if (cart.isDiscountAvailable) {
    coupon = await Coupon.findOne({ couponCode: cart.couponCode, status: 'active' });
    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }
    coupon.usage += 1;
    await coupon.save();
  }

  const obj = {
    couponId: coupon ? coupon._id : null,
    userId: req.user._id,
    discountAmount: cart.discountedAmount,
    totalAmount: cart.totalAmount,
    isDiscountAvailable: cart.isDiscountAvailable,
    couponCode: cart.couponCode,
  }
  if (!coupon) {
    delete obj.couponId;
  }
  const transaction = new Transaction(obj);

  await transaction.save();
  await Cart.findByIdAndDelete(cartId);
  res.status(201).json({
    success: true,
    transaction,
  });
});


// Get all transactions
export const getAllTransactions = catchAsyncErrors(async (req, res, next) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  res.status(200).json({
    success: true,
    transactions,
  });
});

// Get transaction by id
export const getTransactionById = catchAsyncErrors(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return next(new ErrorHandler("Transaction not found", 404));
  }
  res.status(200).json({
    success: true,
    transaction,
  });
});

