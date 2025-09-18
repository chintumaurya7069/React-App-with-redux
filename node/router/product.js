import express from "express";
import { addProduct, getAllProducts, getProductById } from "../controller/product.js";

const router = express.Router();

router.post("/addProduct", addProduct);

router.get("/allProducts", getAllProducts);

router.get("/:productId", getProductById);

export default router;
