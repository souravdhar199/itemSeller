import React from "react";
import { Link } from "react-router-dom";
import "../CSS/item.css";
export default function Listing({ data, id }) {
  return (
    <div className="parent1">
      <Link className="itemOne" to={`/catagory/${data.Catagory}/${id}`}>
        <div className="imageDiv">
          {" "}
          <img src={data.imgurl} alt="ball" />
        </div>
        <p>{data.name}</p>

        <p className="priceStyle">
          <span className="saleTag">${data.Price}</span>
        </p>

        <p>Location: {data.City}</p>
      </Link>
    </div>
  );
}
