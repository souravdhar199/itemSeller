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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Explor />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-passward" element={<Forgotpassward />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
