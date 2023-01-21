import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <footer>
      <nav>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/sales")}>Sales</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </nav>
    </footer>
  );
}
