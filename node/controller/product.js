import { Product } from "../model/Product.js";

export const addProduct = async (req, res) => {
  const { name, title, price, category, description, imgSrc, userId } =
    req.body;

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
