import { Cart } from "../model/Cart.js";

export const addToCart = async (req, res) => {
  const { userId, productId, qty = 1 } = req.body;

  try {
    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: userId,
        product: productId,
        qty,
      });
    }

    res.json({
      message: "Item added to cart successfully!",
      cartItem,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.find({ user: userId }).populate("product");
    res.json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// import { CartItem } from "../model/CartItem.js";

// // 🛒 Add item to cart
// export const addToCart = async (req, res) => {
//   const { userId, productId, qty = 1 } = req.body;

//   try {
//     let cartItem = await CartItem.findOne({ user: userId, product: productId });

//     if (cartItem) {
//       cartItem.qty += qty;
//       await cartItem.save();
//     } else {
//       cartItem = await CartItem.create({
//         user: userId,
//         product: productId,
//         qty,
//       });
//     }

//     res.json({
//       message: "Item added to cart successfully!",
//       cartItem,
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// };

// // 🧾 Get all cart items for a user
// export const getCart = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const cartItems = await CartItem.find({ user: userId }).populate("product");

//     res.json({
//       success: true,
//       cartItems,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 🗑 Remove item from cart
// export const removeFromCart = async (req, res) => {
//   const { cartItemId } = req.params;

//   try {
//     const deletedItem = await CartItem.findByIdAndDelete(cartItemId);

//     if (!deletedItem) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Cart item not found" });
//     }

//     res.json({ message: "Item removed from cart", success: true });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 🔄 Update cart item quantity
// export const updateCartItem = async (req, res) => {
//   const { cartItemId } = req.params;
//   const { qty } = req.body;

//   if (qty < 1) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Quantity must be at least 1" });
//   }

//   try {
//     const updatedItem = await CartItem.findByIdAndUpdate(
//       cartItemId,
//       { qty },
//       { new: true }
//     ).populate("product");

//     if (!updatedItem) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Cart item not found" });
//     }

//     res.json({
//       message: "Cart item updated successfully",
//       cartItem: updatedItem,
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
