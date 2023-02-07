import React from "react";
import { Link } from "react-router-dom";
import "../CSS/item.css";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { db } from "../firebaseconfig.js";
import { useState } from "react";
import "../CSS/profile.css";
import { async } from "@firebase/util";
export default function ListingforProfile({ data, id, refreshData }) {
  // This hook will update the listing
  const [newList, setNewList] = new useState({
    name: "",
    Catagory: "",
    Price: "",
    imgurl: "",
  });
  const [showForm, setShowForm] = new useState(false);
  //this updateListing() will update the data in firebase
  const updateListing = async (e) => {
    e.preventDefault();
    setShowForm(!showForm);
    try {
      const item = doc(db, "products", id);
      await updateDoc(item, {
        name: newList.name,
        Price: newList.Price,
        City: newList.City,
        Catagory: newList.Catagory,
        imgurl: newList.imgurl,
      });
      refreshData(12 + 12);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="parent1">
        <Link className="itemOne" to={`/catagory/${data.Catagory}/${id}`}>
          <div className="imageDiv">
            {" "}
            <img src={data.imgurl} alt="ball" />
          </div>
          <p>{data.name}</p>

          <p className="priceStyle">
            <span>${data.Price}</span>
          </p>

          <p>Location: {data.City}</p>
        </Link>
      </div>
      {showForm ? (
        <form className="formUpdate" onSubmit={updateListing}>
          <p>Name</p>
          <input
            onChange={(e) => setNewList({ ...newList, name: e.target.value })}
            type="text"
          />
          <p>Price</p>
          <input
            onChange={(e) => setNewList({ ...newList, Price: e.target.value })}
            type="number"
          />
          <p>Location</p>
          <input
            onChange={(e) => setNewList({ ...newList, City: e.target.value })}
            type="text"
          />
          <p>Image Url</p>
          <input
            onChange={(e) => setNewList({ ...newList, imgurl: e.target.value })}
            type="text"
          />
          <p>Catagory</p>
          <select
            onChange={(e) =>
              setNewList({ ...newList, Catagory: e.target.value })
            }
          >
            <option>Slect an Option</option>
            <option>sports</option>
            <option>Electronics</option>
            <option>office</option>
            <option>clothing</option>
            <option>kids</option>
            <option>housematarials</option>
          </select>
          <br />
          <button type="submit" className="updateButton">
            Done
          </button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="updateButton">
          Update
        </button>
      )}

      <button
        onClick={async () => [
          await deleteDoc(doc(db, "products", id)),
          refreshData(1 + 1),
        ]}
        className="deleteButton"
      >
        Delete
      </button>
    </>
  );
}
