// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import RegistrationPage from "./RegistrationPage";
import PaymentPage from "./PaymentPage"; // ✅ Add this import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;