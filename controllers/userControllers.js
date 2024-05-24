import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import catchAsyncErrors from "../middlewares/catchAsynErrors.js"
import ErrorHandler from "../utils/errorHandler.js";

export const testUserApi = (req, res) => {
  const { password: _, ...userWithoutPassword } = req.user.toObject();
  res.status(200).json({
    message: "User Api Working successfully",
    user : userWithoutPassword
  });
};


export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password, ...otherDetails } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User Already Exists", 409));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ ...otherDetails, email, password: hashedPassword });
  await user.save();

  const { password: _, ...userWithoutPassword } = user.toObject();

  const token = jwt.sign(
    { id: userWithoutPassword._id, role: userWithoutPassword.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  return res.status(201).json({
    message: "User Registered Successfully",
    user: userWithoutPassword,
    token,
  });
});


export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  const { password: _, ...userWithoutPassword } = user.toObject();

  const token = jwt.sign(
    { id: userWithoutPassword._id, role: userWithoutPassword.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  return res.status(200).json({
    message: "User Login Successful",
    user: userWithoutPassword,
    token,
  });
});
