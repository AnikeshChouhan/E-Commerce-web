import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
  },
  {
    timestamps: true,
  }
);
// export const products = mongoose.model("product", productSchema);
export default mongoose.model("product", productSchema);
