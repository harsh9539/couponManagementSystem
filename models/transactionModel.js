import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  couponId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  isDiscountAvailable: {
    type: Boolean,
    required: true,
  },
  couponCode: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed"],
    default: "completed",
  }
},
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;