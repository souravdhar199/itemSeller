import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/item.css";
import Listing from "../components/Listing.js";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebaseconfig.js";

export default function Catagories() {
  const [listing, setListing] = new useState([]);
  const params = useParams();

  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = collection(db, "products");
        //get The query
        const q = query(
          listingData,
          where("Catagory", "==", params.catagoryName),
          orderBy("timeStamp", "desc"),
          limit(10)
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
  }, [params.catagoryName, setListing]);
  return (
    <div className="parentItems">
      {listing.map((item) => (
        //Calling the Listing component
        <Listing data={item.data} id={item.id} />
      ))}
    </div>
  );
}
