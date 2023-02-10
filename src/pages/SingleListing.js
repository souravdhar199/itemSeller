import React, { cloneElement, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../firebaseconfig";
import "../CSS/singleList.css";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

function SingleListing() {
  const [listing, setListing] = new useState({});
  const [sellerInfo, setSellerInfo] = new useState({});
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

        runq.forEach((doc) => {
          //this will set the hook to only one collection
          if (doc.id === params.id) {
            setListing({ ...doc.data() });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getListing();
  }, []);

  // this hook will trigger when lsiting is fullfill
  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = collection(db, "users");
        //get The query
        const q = query(listingData);

        // Execute the query:
        const runq = await getDocs(q);

        runq.forEach((doc) => {
          //this will set the hook to only one collection
          if (doc.id === listing.useRef) {
            setSellerInfo({ ...doc.data() });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getListing();
  }, [listing]);

  return (
    <div className="parentSingleList">
      <div className="forImge">
        <img src={listing.imgurl} />
      </div>
      <div className="infoList">
        <p className="ItemName">{listing.name}</p>
        <p className="card-price">${listing.Price}</p>
        <p>{listing.City}</p>
        <a
          href={`mailto:${sellerInfo.email}?subject=ItemSeller regarding: ${listing.name}&body=Hi ${sellerInfo.name}, `}
        >
          <button className="conTactSeller">Contact Seller</button>
        </a>
      </div>
    </div>
  );
}

export default SingleListing;
