import React from "react";
import "../CSS/explore.css";
import { useState, useEffect } from "react";
import { db } from "../firebaseconfig";
import Listing from "../components/Listing";
import Pulse from "react-reveal/Pulse";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

function Explor() {
  const [listing, setListing] = new useState([]);
  const [catagory, Setcatagory] = new useState(null);
  const [loadAll, setLoadall] = new useState(false);
  // this hook will trigger when user choses a catagory
  useEffect(() => {
    console.log("Catagory");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catagory]);

  //this hook will trigger when the page will load up for first time
  useEffect(() => {
    console.log("All");
    const getListing = async () => {
      try {
        const listingData = collection(db, "products");
        //get The query
        const q = query(listingData, orderBy("timeStamp", "desc"));

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
  }, [loadAll]);

  return (
    <div className="homePage">
      <h1>Shop by Category</h1>
      <form className="formUpdate">
        <select
          onChange={(e) =>
            e.target.value === "All"
              ? [setLoadall(!loadAll), Setcatagory(null)]
              : Setcatagory(e.target.value)
          }
        >
          <option>All</option>
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
          <Pulse>
            <Listing data={item.data} id={item.id} />
          </Pulse>
        ))}
      </div>
    </div>
  );
}

export default Explor;
