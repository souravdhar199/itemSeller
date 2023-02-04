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
import PrivateRoute from "./components/PrivateRoute";
import Catagories from "./pages/Catagories";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Explor />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/catagories/:catagoryName" element={<Catagories />} />

          {/* This is a Nested Route */}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-passward" element={<Forgotpassward />} />
          <Route path="/profile/newListing" element={<CreateListing />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
