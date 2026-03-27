// src/IndexPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./IndexPage.css";
import logo from "./assets/image.png"; // Your logo
import techBg from "./assets/tech-background.jpg"; // Your tech background image

const IndexPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse movement
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30; // horizontal tilt
    const y = (e.clientY / window.innerHeight - 0.5) * 30; // vertical tilt
    setMousePos({ x, y });
  };

  return (
    <motion.div
      className="index-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        perspective: "1000px",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Background tech image with parallax */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${techBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: mousePos.x,
          rotateX: -mousePos.y,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 50 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          marginTop: "30px",
          zIndex: 1,
        }}
      >
        <img src={logo} alt="Vynedam Logo" style={{ width: "60px", height: "60px" }} />
        <span style={{ fontSize: "2rem", fontWeight: "bold", color: "white" }}>VYNEDAM</span>
      </motion.header>

      {/* Tagline */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        style={{ textAlign: "center", marginTop: "20px", color: "white", zIndex: 1 }}
      >
        <h2>Unlock Your Potential, Build Your Career</h2>
        <p>VYNEDAM connects talented peoples with real projects and mentors.</p>
      </motion.section>

      {/* Highlights Cards */}
      <motion.section
        style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginTop: "40px", zIndex: 1 }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        {[
          { title: "Skill-Based", desc: "Internships based on your skills" },
          { title: "Real Projects", desc: "Work on live projects" },
          { title: "Mentorship", desc: "Learn from experts" },
          { title: "Certificates", desc: "Boost your resume" },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { y: 50, opacity: 0, scale: 0.8 },
              visible: { y: 0, opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "20px",
              borderRadius: "15px",
              width: "200px",
              textAlign: "center",
              color: "white",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Registration Button */}
      <motion.section
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 3 }}
        style={{ marginTop: "50px", zIndex: 1 }}
      >
        <Link
          to="/register"
          style={{
            padding: "12px 30px",
            backgroundColor: "#FF4081",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          Go to Registration
        </Link>
      </motion.section>
    </motion.div>
  );
};

export default IndexPage;