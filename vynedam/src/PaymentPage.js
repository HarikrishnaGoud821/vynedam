// src/PaymentPage.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // If state is missing, redirect to registration
  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  // Destructure with defaults
  const { teamName = "Unknown Team", participants = [], totalAmount = 0 } = location.state || {};

  const handlePayment = () => {
    alert(`Payment of ₹${totalAmount} for ${teamName} successful!`);
    // Redirect to home or success page
    navigate("/", { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#4CAF50",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "15px",
          width: "400px",
          textAlign: "center",
          boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "20px" }}>Payment Portal</h2>
        <p>
          Team: <strong>{teamName}</strong>
        </p>
        <p>
          Total Amount: <strong>₹{totalAmount}</strong>
        </p>

        <h3>Participants</h3>
        <ul style={{ textAlign: "left" }}>
          {participants.map((p, i) => (
            <li key={i}>
              {p.name} - {p.email}
            </li>
          ))}
        </ul>

        <motion.button
          onClick={handlePayment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: "#2E7D32",
            color: "white",
            padding: "12px 30px",
            fontSize: "1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Pay Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentPage;