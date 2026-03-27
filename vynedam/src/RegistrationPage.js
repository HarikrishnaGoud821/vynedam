// src/RegistrationPage.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "./assets/image.png";
import techBg from "./assets/tech-background.jpg";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [numParticipants, setNumParticipants] = useState(1);
  const [participants, setParticipants] = useState([{ name: "", email: "" }]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // mouse position
  const pricePerPerson = 400;

  // Track mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5; // range -0.5 to 0.5
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNumParticipantsChange = (e) => {
    let n = parseInt(e.target.value);
    if (n > 5) n = 5;
    if (n < 1) n = 1;
    setNumParticipants(n);

    const newParticipants = [...participants];
    while (newParticipants.length < n) newParticipants.push({ name: "", email: "" });
    while (newParticipants.length > n) newParticipants.pop();
    setParticipants(newParticipants);
  };

  const handleParticipantChange = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    setParticipants(newParticipants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = numParticipants * pricePerPerson;
    navigate("/payment", { state: { teamName, participants, totalAmount } });
  };

  // Parallax calculations
  const bgX = 50 + mousePos.x * 10; // background moves 10%
  const bgY = 50 + mousePos.y * 10;
  const rotateX = mousePos.y * 15; // tilt up/down
  const rotateY = mousePos.x * 15; // tilt left/right

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${techBg})`,
        backgroundSize: "cover",
        backgroundPosition: `${bgX}% ${bgY}%`,
        backgroundRepeat: "no-repeat",
        transition: "background-position 0.1s",
      }}
    >
      {/* Logo */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 50 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <img src={logo} alt="Vynedam Logo" style={{ width: "80px", height: "80px" }} />
        <span style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}>VYNEDAM</span>
      </motion.header>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "50px" }}>
        {/* Form with 3D tilt */}
        <motion.form
          onSubmit={handleSubmit}
          style={{
            width: "400px",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
            perspective: "1000px",
          }}
          animate={{
            rotateX: -rotateX,
            rotateY: rotateY,
            scale: 1.02,
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h2 style={{ color: "#333" }}>Hackathon Team Registration</h2>
          <label>Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }}
          />

          <label>Number of Participants (max 5):</label>
          <input
            type="number"
            value={numParticipants}
            onChange={handleNumParticipantsChange}
            min={1}
            max={5}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }}
          />

          {participants.map((p, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <label>Participant {index + 1} Name:</label>
              <input
                type="text"
                value={p.name}
                onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginBottom: "5px", borderRadius: "5px" }}
              />
              <label>Email:</label>
              <input
                type="email"
                value={p.email}
                onChange={(e) => handleParticipantChange(index, "email", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
              />
            </div>
          ))}

          <p style={{ fontWeight: "bold", marginTop: "20px" }}>
            Total Amount: ₹{numParticipants * pricePerPerson}
          </p>

          <button
            type="submit"
            style={{
              backgroundColor: "#2E7D32",
              color: "white",
              padding: "12px 25px",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1B5E20")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2E7D32")}
          >
            Register Team
          </button>
        </motion.form>

        {/* Participant card with 3D tilt */}
        <motion.div
          style={{
            width: "350px",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            perspective: "1000px",
          }}
          animate={{
            rotateX: -rotateX,
            rotateY: rotateY,
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h2 style={{ color: "#333" }}>Participant Details</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #000" }}>
                <th style={{ textAlign: "left", paddingBottom: "8px" }}>Name</th>
                <th style={{ textAlign: "left", paddingBottom: "8px" }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={{ padding: "5px 0" }}>{p.name}</td>
                  <td style={{ padding: "5px 0" }}>{p.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationPage;