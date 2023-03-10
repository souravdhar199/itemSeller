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
import SingleListing from "./pages/SingleListing";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Explor />} />
          <Route path="/sales" element={<Sales />} />
          {/* This is a Nested Route */}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-passward" element={<Forgotpassward />} />
          <Route path="/:catagoryName/:id" element={<SingleListing />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
