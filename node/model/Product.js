import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  title: { type: String, require: true },
  price: { type: String, require: true },
  category: { type: String, require: true },
  description: { type: String, require: true },
  imgSrc: { type: String },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Product = mongoose.model("Product", productSchema);
