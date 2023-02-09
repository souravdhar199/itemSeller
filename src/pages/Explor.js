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
  const [catagory, Setcatagory] = new useState(null);
  // this hook will trigger when user choses a catagory
  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = collection(db, "products");
        //get The query
        const q = query(
          listingData,
          where("Catagory", "==", catagory),
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
  }, [catagory]);

  //this hook will trigger when the page will load up for first time
  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = collection(db, "products");
        //get The query
        const q = query(listingData);

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
    <div className="homePage">
      <h1>Shop by Catagory</h1>
      <form className="formUpdate">
        <select onChange={(e) => Setcatagory(e.target.value)}>
          <option>Slect an Option</option>
          <option>sports</option>
          <option>Electronics</option>
          <option>office</option>
          <option>clothing</option>
          <option>kids</option>
          <option>housematarials</option>
        </select>
        <br />
      </form>
      <div className="parentItems">
        {listing.map((item) => (
          //Calling the Listing component
          <Listing data={item.data} id={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Explor;
