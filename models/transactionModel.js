import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  couponId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Coupon",
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
    index: true
  },
  discount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  isPercentage: {
    type: Boolean,
    required: true,
  },
  couponCode: {
    type: String,
    required: true,
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