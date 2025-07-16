import React, { useState, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
//import "./Contact.css";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const toastRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, formData);
    setFormData({ name: "", email: "", message: "" });

    const toast = new bootstrap.Toast(toastRef.current);
    toast.show();
  } catch (err) {
    console.error("Error submitting contact form:", err);
    alert("Something went wrong. Try again.");
  }
};

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Us</h2>

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Your Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>

      {/* Toast */}
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
            <div className="toast-body">Thank you! Your message has been sent.</div>
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

export default ContactForm;
