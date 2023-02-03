import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../CSS/item.css";
export default function Listing({ data, id }) {
  const params = useParams();
  return (
    <div className="parent1">
      <Link to={`/catagory/${params.catagoryName}/${id}`}>
        <div className="imageDiv">
          {" "}
          <img src={data.imgurl} alt="ball" />
        </div>
        <p>{data.name}</p>
        <p>${data.Price}</p>
        <p>Location: {data.City}</p>
      </Link>
    </div>
  );
}
