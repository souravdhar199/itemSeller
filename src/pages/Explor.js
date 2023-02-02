import React from "react";
import { Link } from "react-router-dom";
import "../CSS/explore.css";

function Explor() {
  return (
    <div className="parent">
      <h1 className="explorehead">Catagories</h1>
      <div className="catagories">
        <Link to="/catagories/housematarials">
          <div>
            <p>House Matarials</p>
          </div>
        </Link>
        <Link to="/catagories/Electronics">
          <div>
            <p>Electronics</p>
          </div>
        </Link>
        <Link to="/catagories/office">
          <div>
            <p>Office</p>
          </div>
        </Link>
        <Link to="/catagories/clothing">
          <div>
            <p>Clothing</p>
          </div>
        </Link>
        <Link to="/catagories/sports">
          <div>
            <p>Sports</p>
          </div>
        </Link>
        <Link to="/catagories/kids">
          <div>
            <p>Kids</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Explor;
