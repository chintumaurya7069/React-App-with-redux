import { Product } from "../model/Product.js";

export const addProduct = async (req, res) => {
  const { name, title, price, category, description, imgSrc, userId } = req.body;

  try {
    const product = await Product.create({
      name,
      title,
      price,
      category,
      description,
      imgSrc,
      user: userId, 
    });

    res.json({
      message: "Product registered successfully!",
      product,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "user",
      "firstName lastName email"
    );

    res.status(200).json({
      message: "Products fetched successfully!",
      products,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getProductById = async(req, res) => {
  const {productId} = req.params;
  try {
    const product = await Product.findById(productId);
    res.json({
      message: "Products fetched successfully!",
      product,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}