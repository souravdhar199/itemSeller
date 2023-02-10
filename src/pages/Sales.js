import React from "react";
import { useState, useEffect } from "react";
import "../CSS/item.css";
import Listing from "../components/Listing.js";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebaseconfig.js";
export default function Sales() {
  const [listing, setListing] = new useState([]);
  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = collection(db, "products");
        //get The query
        const q = query(
          listingData,
          where("onSale", "==", "Yes"),
          orderBy("timeStamp", "desc")
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="parentItems">
      {listing.map((item) => (
        //Calling the Listing component
        <Listing data={item.data} id={item.id} />
      ))}
    </div>
  );
}
