import Coupon from "../models/couponModel.js"
import catchAsyncErrors from "../middlewares/catchAsynErrors.js"
import ErrorHandler from "../utils/errorHandler.js";


export const testCouponApi = (req, res) => {
  res.status(200).json({
    message: "Coupon Api Working successfully",
  });
}

// @desc      Get all coupons
// @route     GET /api/v1/coupons
// @access    Public
export const getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find();
  res.status(200).json({
    success: true,
    coupons,
  });
});

// @desc      Create a new coupon
// @route     POST /api/v1/coupons
// @access    Private/Admin
export const createCoupon = catchAsyncErrors(async (req, res, next) => {

  const coupon = await Coupon.create(req.body);

  res.status(201).json({
    success: true,
    coupon,
  });
});

// @desc      Get coupon by id
// @route     GET /api/v1/coupons/:id
// @access    Public
export const getCouponById = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler("Coupon not found", 404));
  }

  res.status(200).json({
    success: true,
    coupon,
  });
});

// @desc      Update coupon by id
// @route     PUT /api/v1/coupons/:id
// @access    Private/Admin
export const updateCoupon = catchAsyncErrors(async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler("Coupon not found", 404));
  }

  coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    coupon,
  });
});

// @desc      Delete coupon by id
// @route     DELETE /api/v1/coupons/:id
// @access    Private/Admin

export const deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler("Coupon not found", 404));
  }

  await coupon.remove();

  res.status(200).json({
    success: true,
    message: "Coupon is deleted successfully",
  });
});

// @desc      Apply coupon
// @route     POST /api/v1/coupons/apply
// @access    Private
export const applyCoupon = catchAsyncErrors(async (req, res, next) => {
  
});
