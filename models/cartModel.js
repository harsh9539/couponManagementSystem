import mongoose from "mongoose";

const cartModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  discountedAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  couponCode: {
    type: String,
    default: "",
  },
  isDiscountAvailable: {
    type: Boolean,
    default: false,
  }
},
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartModel);
export default Cart;