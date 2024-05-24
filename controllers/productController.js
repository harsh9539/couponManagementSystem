import Product from "../models/productModel.js"
import catchAsyncErrors from "../middlewares/catchAsynErrors.js"
import ErrorHandler from "../utils/errorHandler.js";



// Get all products
// @route     GET /api/v1/products
// @access    Public
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});


// Get single product using id
// @route     GET /api/v1/products/:id
// @access    Public
export const getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});


// Create a new product
// @route     POST /api/v1/products
// @access    Private/Admin
export const createProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});


// Update product using id
// @route     PUT /api/v1/products/:id
// @access    Private/Admin
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product
  product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product =
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
  res.status(200).json({
    success: true,
    product,
  });
});


// Delete product using id
// @route     DELETE /api/v1/products/:id
// @access    Private/Admin
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});
