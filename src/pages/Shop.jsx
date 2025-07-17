import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./shop.css";

function Shop() {
  const [jerseys, setJerseys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJerseys = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        setJerseys(res.data);
      } catch (err) {
        console.error("Error fetching jerseys:", err);
      }
    };

    fetchJerseys();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Shop Jerseys</h2>
      <div className="row g-4">
        {jerseys.map((jersey, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div
              className="card h-100 shadow-sm border-0 product-card"
              onClick={() => navigate(`/product/${jersey._id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
              src={`/${jersey.image}`}
                className="card-img-top"
                alt={jersey.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{jersey.name}</h6>
                <p className="card-text fw-semibold">₹{jersey.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;