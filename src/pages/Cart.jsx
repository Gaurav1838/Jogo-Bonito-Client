import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import axios from "axios";


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
    calculateTotal(cartData);
  }, []);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = parseInt(quantity) || 1;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

const handleCheckout = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) return;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderData = { items: cart, total };

  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, orderData);

    sessionStorage.setItem("orderData", JSON.stringify(orderData));
    localStorage.removeItem("cart");

    navigate("/order-confirmation");
  } catch (err) {
    console.error("Order submission failed", err);
    alert("Something went wrong while placing your order.");
  }
};


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 cart-card">
                  <img
                    src={`/assets/${item.image}`}
                    className="cart-img"
                    alt={item.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Size: {item.size}</p>
                    <p className="card-text">Price: ₹{item.price}</p>
                    <div className="mb-2">
                      <label className="me-2">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        className="form-control d-inline-block"
                        style={{ width: "80px" }}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                      />
                    </div>
                    <p className="cart-subtotal">
                      Subtotal: ₹{item.price * item.quantity}
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h4 className="cart-total">
            Total: <span className="text-success">₹{total}</span>
          </h4>
          <button className="btn btn-success w-100 mt-3" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
