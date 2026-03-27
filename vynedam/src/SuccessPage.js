// src/SuccessPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { team, amount, participants, paymentId } = location.state || {
    team: "Unknown Team",
    amount: 0,
    participants: [],
    paymentId: "N/A",
  };

  const paymentDate = new Date().toLocaleString(); // current date/time

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
          width: "500px",
          textAlign: "center",
          boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ color: "#2E7D32", marginBottom: "20px" }}>
          Payment Successful ✅
        </h2>

        {/* Payment Summary */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <p>
            <strong>Team Name:</strong> {team}
          </p>
          <p>
            <strong>Number of Participants:</strong> {participants.length}
          </p>
          <p>
            <strong>Total Amount Paid:</strong> ₹{amount}
          </p>
          <p>
            <strong>Payment ID:</strong> {paymentId}
          </p>
          <p>
            <strong>Payment Date:</strong> {paymentDate}
          </p>
        </div>

        {/* Participant Details */}
        <h3 style={{ color: "#333", marginBottom: "10px" }}>Participants:</h3>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "1rem", color: "#555", marginBottom: "20px" }}>
          {participants.map((p, index) => (
            <li key={index}>
              {index + 1}. {p.name} - {p.email}
            </li>
          ))}
        </ul>

        {/* Go Home Button */}
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: "#2E7D32",
            color: "white",
            padding: "12px 25px",
            fontSize: "1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SuccessPage;