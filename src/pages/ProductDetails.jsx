import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [jersey, setJersey] = useState(null);
  const [related, setRelated] = useState([]);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const toastRef = useRef(null);

  useEffect(() => {
    const fetchJersey = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setJersey(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    const fetchAllJerseys = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        const others = res.data.filter(j => j._id !== productId);
        const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
        setRelated(shuffled);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    fetchJersey();
    fetchAllJerseys();
  }, [productId]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) => item._id === jersey._id && item.size === size
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += parseInt(quantity);
    } else {
      cart.push({
        _id: jersey._id,
        name: jersey.name,
        price: jersey.price,
        size,
        quantity: parseInt(quantity),
        image: jersey.image,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Show toast
    const toast = new bootstrap.Toast(toastRef.current);
    toast.show();
  };

  if (!jersey) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row mb-5">
        <div className="col-md-6 text-center">
          <img
            src={`/${jersey.image}`}
            alt={jersey.name}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{jersey.name}</h2>
          <p><strong>Club:</strong> {jersey.club}</p>
          <p><strong>Year:</strong> {jersey.year}</p>
          <p className="h4 text-success"><strong>Price:</strong> ₹{jersey.price}</p>

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
            <label htmlFor="qtySelect" className="form-label">Quantity:</label>
            <input
              id="qtySelect"
              type="number"
              className="form-control"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <h4 className="mb-4">Related Products</h4>
      <div className="row g-4">
        {related.map((item) => (
          <div className="col-6 col-md-4 col-lg-3" key={item._id}>
            <div
              className="card h-100 shadow-sm border-0"
              onClick={() => navigate(`/product/${item._id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`/${item.image}`}
                className="card-img-top"
                alt={item.name}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title mb-0">{item.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1055 }}
      >
        <div
          className="toast align-items-center text-white bg-success border-0"
          role="alert"
          ref={toastRef}
        >
          <div className="d-flex">
            <div className="toast-body">
              Item added to cart!
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
