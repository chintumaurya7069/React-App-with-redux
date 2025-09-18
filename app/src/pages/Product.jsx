import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products/productThunkApp";
import { Card, CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // 🧭 Import navigation

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ React Router hook

  const { productData } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="d-flex flex-wrap gap-3">
      {productData &&
        productData.products?.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/admin/product/${item._id}`)} 
            style={{ cursor: "pointer", width: "18rem" }}
          >
            <Card>
              <CardBody>
                <p>{item.name}</p>
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </CardBody>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default Product;
