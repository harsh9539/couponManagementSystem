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
  ]
},
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartModel);
export default Cart;