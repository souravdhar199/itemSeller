import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import useAuthStatus from "../hooks/useAuthStatus.js";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseconfig.js";
import ListingforProfile from "../components/ListingforProfile.js";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

import "../CSS/profile.css";

export default function Profile() {
  // All the hooks
  const [updateEmail, setUpdateEmail] = new useState(false); // this hook will work as to update email
  const [newEmail, setNewEmail] = new useState(); // takes input data
  const [showForm, setShowForm] = useState(false);
  const [count, setCounter] = useState(0); // this hook will call triggered useState when we are expecting change in listing
  const auth = getAuth();
  const [loggedUser, setLogged] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [newList, setNewList] = new useState({
    name: "",
    Catagory: "",
    Price: "",
    imgurl: "",
  });
  const [listing, setListing] = new useState([]); // Storing all user Listing here
  const { Uid } = useAuthStatus();
  useEffect(() => {
    const getListing = async () => {
      try {
        const listingData = collection(db, "products");
        //get The query
        const q = query(
          listingData,
          //if  a document has the same Uid
          where("useRef", "==", Uid),
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
  }, [Uid, count]);

  // this fucntion will add new item in database
  const addNewItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        name: newList.name,
        Price: newList.Price,
        City: newList.City,
        Catagory: newList.Catagory,
        timeStamp: serverTimestamp(),
        imgurl: newList.imgurl,
        useRef: Uid,
      });
      setCounter(count + 1);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  // this function will update NAME
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
          <button
            className="buttonSignin"
            onClick={() => setUpdateEmail(!updateEmail)}
          >
            Update Name
          </button>
        )}
        {updateEmail ? (
          <div className="addList">
            <form onSubmit={changeEmail}>
              <p>Type your new name</p>
              <input onChange={(e) => setNewEmail(e.target.value)} type="txt" />
              <br></br>
              <button className="buttonSignin">Done</button>
            </form>
          </div>
        ) : (
          <></>
        )}

        <br></br>
      </div>
      <div className="addList">
        <button className="buttonSignin" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Delete listing" : "Add new Listing"}
        </button>

        {showForm ? (
          <form onSubmit={addNewItem}>
            <p>Name of the Product</p>
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
            <p>Please pasete the Image Url link </p>
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
              <option>Select an Option</option>
              <option>sports</option>
              <option>Electronics</option>
              <option>office</option>
              <option>clothing</option>
              <option>kids</option>
              <option>housematarials</option>
            </select>
            <br />
            <button className="buttonSignin">Create new Listing</button>
          </form>
        ) : (
          <></>
        )}
        <br></br>
        <button className="buttonSignin" onClick={onLogout}>
          Logout
        </button>
      </div>
      <h1>Your current listings </h1>
      <div className="parentItems">
        {listing.map((item) => (
          //Calling the Listing component
          <div className="userSee">
            <ListingforProfile
              data={item.data}
              id={item.id}
              refreshData={setCounter}
              refresh={count}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
