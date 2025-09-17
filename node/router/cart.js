import express from "express";
import { addToCart, getCart } from "../controller/cart.js";

const router = express.Router();

router.post("/addToCart", addToCart);
router.get("/:userId", getCart);

export default router;


// import express from "express";
// import {
//   addToCart,
//   getCart,
//   removeFromCart,
//   updateCartItem,
// } from "../controllers/cartController.js";

// const router = express.Router();

// router.post("/add", addToCart); // POST /api/cart/add
// router.get("/:userId", getCart); // GET /api/cart/:userId
// router.delete("/remove/:cartItemId", removeFromCart); // DELETE /api/cart/remove/:cartItemId
// router.put("/update/:cartItemId", updateCartItem); // PUT /api/cart/update/:cartItemId

// export default router;
