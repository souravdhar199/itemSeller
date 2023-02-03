import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Listing from "../components/Listing.js";
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
          console.log(doc.data());

          temp.push({ id: doc.id, data: doc.data() });

          toast.success("All data loaded");
        });
        setListing(temp);
      } catch (error) {
        console.log(error);
      }
    };
    getListing();
  }, []);
  return (
    <div>
      {listing.map((item) => (
        //Calling the Listing component
        <Listing data={item.data} id={item.id} />
      ))}
    </div>
  );
}
