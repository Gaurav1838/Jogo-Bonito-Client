import React, { useEffect, useRef, useState } from "react";
//import axios from "axios";

function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const submittedRef = useRef(false); 

  useEffect(() => {
    const storedOrder = JSON.parse(sessionStorage.getItem("orderData"));
      if (storedOrder) setOrder(storedOrder);
    }, []);


  if (!order) return <div className="container my-5">Placing your order...</div>;

  return (
    <div className="container my-5">
      <h2 className="text-center text-success mb-4">Order Confirmed!</h2>
      <p className="text-center">Thank you for your purchase. Your order has been placed successfully.</p>

      <h4 className="mt-5">Order Summary</h4>
      <ul className="list-group">
        {order.items.map((item, index) => (
          <li className="list-group-item d-flex justify-content-between" key={index}>
            {item.name} ({item.size}) × {item.quantity}
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between fw-bold">
          Total
          <span>₹{order.total}</span>
        </li>
      </ul>
    </div>
  );
}

export default OrderConfirmation;
