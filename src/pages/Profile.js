import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseconfig.js";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";

import "../CSS/profile.css";

export default function Profile() {
  const [updateEmail, setUpdateEmail] = new useState(false); // this hook will work as to update email
  const [newEmail, setNewEmail] = new useState(); // takes input data
  const auth = getAuth();
  const [loggedUser, setLogged] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  // this fucntion will add new item in database
  const addNewItem = () => {
    try {
      const newData = addDoc(collection(db, "products"), {
        name: "sadSourav",
        City: "Atlanta",
        Catagory: "sports",
        timeStamp: "February 2, 2023 at 4:36:20 PM UTC-5",
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
            <label>Type your new name</label>
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
        <button onClick={addNewItem}>Add new Listing</button>
      </div>
    </div>
  );
}
