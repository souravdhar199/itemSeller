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
        <div className="logoImage" back onClick={() => navigate("/")}>
          <img
            alt="img"
            src="https://dynamic.brandcrowd.com/asset/logo/b34a16f6-26e8-4c5c-a2f7-76a2a6fb458c/logo-search-grid-1x?logoTemplateVersion=1&v=637641652227830000&text=itemSeller"
          />
        </div>
        <ul>
          <li onClick={() => navigate("/")}>Explore</li>
          <li onClick={() => navigate("/sales")}>Sales</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </nav>
    </div>
  );
}
