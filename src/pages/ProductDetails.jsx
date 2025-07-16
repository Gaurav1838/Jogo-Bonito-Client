import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const [jersey, setJersey] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  useEffect(() => {
    axios
      .get(`https://jogo-bonito-server.onrender.com/api/products/${productId}`)
      .then((res) => setJersey(res.data))
      .catch((err) => console.error("Error fetching jersey:", err));
  }, [productId]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
      _id: jersey._id,
      name: jersey.name,
      image: jersey.image, // should be full URL from backend
      size,
      quantity,
      price: jersey.price,
    };

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${jersey.name} added to cart!`);
  };

  if (!jersey) return <div className="container my-5">Loading...</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={`https://jogo-bonito-server.onrender.com/${jersey.image}`}
            alt={jersey.name}
            className="img-fluid product-detail-img"
          />
        </div>
        <div className="col-md-6">
          <h2>{jersey.name}</h2>
          <p><strong>Club:</strong> {jersey.club}</p>
          <p><strong>Year:</strong> {jersey.year}</p>
          <p><strong>Price:</strong> ₹{jersey.price}</p>

          <div className="mb-3">
            <label htmlFor="sizeSelect" className="form-label">Choose Size:</label>
            <select
              id="sizeSelect"
              className="form-select"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="quantitySelect" className="form-label">Quantity:</label>
            <input
              type="number"
              className="form-control"
              id="quantitySelect"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={{ maxWidth: "120px" }}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
