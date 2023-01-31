import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/Navbar.css";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="navDiv">
      <nav>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/sales")}>Sales</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/sign-in")}>Sign-in</li>
          <li onClick={() => navigate("/sign-up")}>Sign-up</li>
        </ul>
      </nav>
    </div>
  );
}
