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
          <li onClick={() => navigate("/")}>Explore</li>
          <li onClick={() => navigate("/sales")}>Sales</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </nav>
    </div>
  );
}
