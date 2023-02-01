import React from "react";
import { Link } from "react-router-dom";
import "../CSS/explore.css";

function Explor() {
  return (
    <div>
      <h1 className="explorehead">Catagories</h1>
      <div className="catagories">
        <Link>
          <div>
            <p>House Matarials</p>
          </div>
        </Link>
        <Link>
          <div>
            <p>Electronics</p>
          </div>
        </Link>
        <Link>
          <div>
            <p>Office</p>
          </div>
        </Link>
        <Link>
          <div>
            <p>Clothing</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Explor;
