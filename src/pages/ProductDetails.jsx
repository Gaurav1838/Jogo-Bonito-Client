import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const [jersey, setJersey] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJersey() {
      try {
        const res = await axios.get(
          `https://jogo-bonito-server.onrender.com/api/products/${productId}`
        );
        setJersey(res.data);
      } catch (err) {
        console.error("Error loading product:", err.message);
        setError("Failed to load jersey. Please try again later.");
      }
    }

    fetchJersey();
  }, [productId]);

  if (error) return <div className="container my-5 text-danger">{error}</div>;
  if (!jersey) return <div className="container my-5">Loading...</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={jersey.image}
            alt={jersey.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{jersey.name}</h2>
          <p><strong>Club:</strong> {jersey.club}</p>
          <p><strong>Year:</strong> {jersey.year}</p>
          <p className="h4 text-success"><strong>₹{jersey.price}</strong></p>

          <div className="mb-3">
            <label className="form-label">Size</label>
            <select className="form-select">
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input type="number" className="form-control" min="1" defaultValue="1" />
          </div>

          <button className="btn btn-primary w-100">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
