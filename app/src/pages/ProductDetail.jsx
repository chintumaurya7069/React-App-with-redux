import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../redux/products/productThunkApp";
import { addCart, getCartData } from "../redux/cart/cartThunkApp";

const ProductDetail = () => {
  const { id: productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { singleProduct } = useSelector((state) => state.products);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (userId) {
      dispatch(getCartData(userId));
    }
  }, [dispatch, userId]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!userId || !productId) return;
    dispatch(addCart({ userId, productId, qty: quantity }));
  };

  const product = singleProduct?.product;

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.name}</h1>
      <h2>{product.title}</h2>

      <img
        src={product.imgSrc}
        alt={product.name}
        style={{ width: "400px", height: "auto", objectFit: "cover" }}
      />

      <p>{product.description}</p>

      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <div className="flex items-center gap-3">
      <div className="flex gap-1 items-center my-4">
        <button onClick={increaseQuantity} className="px-2 py-1 bg-gray-200 rounded">
          +
        </button>
        <p>{quantity}</p>
        <button onClick={decreaseQuantity} className="px-2 py-1 bg-gray-200 rounded">
          -
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-yellow-500 h-[40px] px-4 rounded-lg hover:bg-yellow-600 transition-colors"
        >
        Add To Cart
      </button>
        </div>
    </div>
  );
};

export default ProductDetail;
