import React from "react";
import { Link } from "react-router-dom";
import "../CSS/explore.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebaseconfig";
import Listing from "../components/Listing";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

function Explor() {
  const [listing, setListing] = new useState([]);
  const params = useParams();

  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = collection(db, "products");
        //get The query
        const q = query(
          listingData,

          limit(3)
        );

        // Execute the query:
        const runq = await getDocs(q);
        const temp = [];
        runq.forEach((doc) => {
          temp.push({ id: doc.id, data: doc.data() });
        });
        setListing(temp);
      } catch (error) {
        console.log(error);
      }
    };
    getListing();
  }, []);

  return (
    <>
      <div className="parentItems">
        {listing.map((item) => (
          //Calling the Listing component
          <Listing data={item.data} id={item.id} />
        ))}
      </div>
      <h1>Shop by Catagories</h1>
      <div className="parent">
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
        </div>
        <div className="parentItems">
          {listing.map((item) => (
            //Calling the Listing component
            <Listing data={item.data} id={item.id} />
          ))}
        </div>
        <h1>Shop by Catagories</h1>
        <div className="catagories">
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
    </>
  );
}

export default Explor;
