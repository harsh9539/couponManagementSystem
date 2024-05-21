import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  couponCode: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive", "expired"],
    default: "active",
  },
  type: {
    type: String,
    required: true,
    enum: ["flat", "upto"]
  },
  usage: {
    type: Number,
    default: 0
  },
  usageLimit: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: ""
  },
  isForNewUser: {
    type: Boolean,
    default: false
  },
  minimumOrderAmount: {
    type: Number,
    required: true,
  },
  maximumDiscountAmount: {
    type: Number,
    required: true,
  },
  isPercentage: {
    type: Boolean,
    required: true,
    default: false
  }
},
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;