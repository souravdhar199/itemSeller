import React from "react";
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

export default function Catagories() {
  const [listing, setListing] = new useState(null);
  const params = useParams();

  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = collection(db, "listing");
        //get The query
        const q = query(
          listingData,
          where("type", "==", params.catagoryName),
          orderBy("timeStamp", "desc"),
          limit(10)
        );

        // Execute the query:
        const runq = await getDocs(q);

        runq.forEach((doc) => {
          console.log(doc.data());
        });
      } catch (error) {
        console.log(error);
      }
    };
    getListing();
  });
  return <div>Catagories</div>;
}
