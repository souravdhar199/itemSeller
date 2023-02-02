import React from "react";
import { Link } from "react-router-dom";
import "../CSS/explore.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebaseconfig.js";
import { async } from "@firebase/util";
function Explor() {
  const [listing, setListing] = new useState(null);
  const params = useParams();

  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = collection(db, "listing");
        //get The query
        const q = query(
          listingData,
          where("type", "==", "sports"),
          orderBy("timeStamp", "desc"),
          limit(10)
        );

        // Execute the query:

        const runq = await getDocs(q);
        console.log(runq);

        runq.forEach((doc) => {
          console.log(doc.data());
        });
      } catch (error) {
        console.log(error);
      }
    };
    getListing();
  });

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
