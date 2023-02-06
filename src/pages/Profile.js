import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { db } from "../firebaseconfig.js";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import "../CSS/profile.css";

export default function Profile() {
  const [updateEmail, setUpdateEmail] = new useState(false); // this hook will work as to update email
  const [newEmail, setNewEmail] = new useState(); // takes input data
  const auth = getAuth();
  const [newList, setNewList] = new useState({
    name: "",
    Catagory: "",
    Price: "",
    imgurl: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loggedUser, setLogged] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  // this fucntion will add new item in database
  const addNewItem = async (e) => {
    e.preventDefault();
    try {
      const newData = await addDoc(collection(db, "products"), {
        name: newList.name,
        Price: newList.Price,
        City: newList.City,
        Catagory: newList.Catagory,
        timeStamp: serverTimestamp(),
        imgurl: newList.imgurl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const changeEmail = async (e) => {
    e.preventDefault();

    try {
      if (auth.currentUser.displayName !== newEmail) {
        // thats changing data locally
        await updateProfile(auth.currentUser, {
          displayName: newEmail,
        });
        // update in FireStore
        const user = doc(db, "users", auth.currentUser.uid);
        await updateDoc(user, {
          name: newEmail,
        });
        setLogged({ ...loggedUser, name: newEmail });
      }
    } catch {}

    setUpdateEmail(!updateEmail);
  };

  return (
    <div className="parentProfile">
      <div className="userInfo">
        <h1>Welcome, {loggedUser.name}</h1>
        <h1>{loggedUser.email}</h1>
        {updateEmail ? (
          <></>
        ) : (
          <button onClick={() => setUpdateEmail(!updateEmail)}>
            Update Name
          </button>
        )}
        {updateEmail ? (
          <form onSubmit={changeEmail}>
            <p>Type your new name</p>
            <br></br>
            <input onChange={(e) => setNewEmail(e.target.value)} type="txt" />
            <br></br>
            <button>Done</button>
          </form>
        ) : (
          <></>
        )}

        <br></br>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className="addList">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Delete listing" : "Add new Listing"}
        </button>

        {showForm ? (
          <form onSubmit={addNewItem}>
            <p>Name</p>
            <input
              onChange={(e) => setNewList({ ...newList, name: e.target.value })}
              type="text"
            />
            <p>Price</p>
            <input
              onChange={(e) =>
                setNewList({ ...newList, Price: e.target.value })
              }
              type="number"
            />
            <p>Location</p>
            <input
              onChange={(e) => setNewList({ ...newList, City: e.target.value })}
              type="text"
            />
            <p>Image Url</p>
            <input
              onChange={(e) =>
                setNewList({ ...newList, imgurl: e.target.value })
              }
              type="text"
            />
            <p>Catagory</p>
            <select
              onChange={(e) =>
                setNewList({ ...newList, Catagory: e.target.value })
              }
            >
              <option>sports</option>
              <option>Electronics</option>
              <option>office</option>
              <option>clothing</option>
              <option>kids</option>
            </select>
            <br />
            <button>Create new Listing</button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
