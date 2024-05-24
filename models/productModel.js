import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    default: 0,
  }
},
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;