import React from "react";
import { Link } from "react-router-dom";

export default function Listing({ data, id }) {
  return (
    <div>
      <img src={data.imgurl} alt="ball" />
      <p>{data.name}</p>
      <p>${data.Price}</p>
      <p>Location: {data.City}</p>
    </div>
  );
}
