/* eslint-disable no-unreachable */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Explor from "./pages/Explor";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Sales from "./pages/Sales";
import Forgotpassward from "./pages/Forgotpassward";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explor />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/profile" element={<Signin />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-passward" element={<Forgotpassward />} />
        </Routes>
        <Navbar />
      </Router>
    </>
  );
}

export default App;
