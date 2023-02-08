import React from "react";
import { Link } from "react-router-dom";
import "../CSS/item.css";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig.js";
import { useState } from "react";
import "../CSS/profile.css";
export default function ListingforProfile({ data, id, refreshData, refresh }) {
  // This hook will update the listing
  const [newList, setNewList] = new useState({
    name: null,
    Catagory: null,
    Price: null,
    imgurl: null,
    onSale: null,
  });
  const [showForm, setShowForm] = new useState(false);
  //this updateListing() will update the data in firebase
  //
  const updateListing = async (e) => {
    e.preventDefault();
    setShowForm(!showForm);
    try {
      const item = doc(db, "products", id);
      await updateDoc(item, {
        name: newList.name != null ? newList.name : data.name,
        Price: newList.Price != null ? newList.Price : data.Price,
        City: newList.City != null ? newList.City : data.City,
        Catagory: newList.Catagory != null ? newList.Catagory : data.Catagory,
        imgurl: newList.imgurl != null ? newList.imgurl : data.imgurl,
        onSale: newList.onSale,
      });
      refreshData(refresh + 1);
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
            defaultValue={data.name}
            onChange={(e) => setNewList({ ...newList, name: e.target.value })}
            type="text"
          />
          <p>Price</p>
          <input
            defaultValue={data.Price}
            onChange={(e) => setNewList({ ...newList, Price: e.target.value })}
            type="number"
          />
          <p>Location</p>
          <input
            defaultValue={data.City}
            onChange={(e) => setNewList({ ...newList, City: e.target.value })}
            type="text"
          />
          <p>Image Url</p>
          <input
            defaultValue={data.imgurl}
            onChange={(e) => setNewList({ ...newList, imgurl: e.target.value })}
            type="text"
          />
          <p>Catagory</p>
          <select
            defaultValue={data.Catagory}
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
          <p>List this product on Clearence</p>
          <select
            onChange={(e) => setNewList({ ...newList, onSale: e.target.value })}
          >
            <option>Select an Option</option>
            <option>Yes</option>
            <option>No</option>
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
          refreshData(refresh + 1),
        ]}
        className="deleteButton"
      >
        Delete
      </button>
    </>
  );
}
