import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseconfig.js";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const [updateEmail, setUpdateEmail] = new useState(false); // this hook will work as to update email
  const [newEmail, setNewEmail] = new useState(); // takes input data
  const auth = getAuth();
  const [loggedUser, setLogged] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
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
    <div>
      <h1>Wlcome, {loggedUser.name}</h1>
      <h1>Email - {loggedUser.email}</h1>
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
  );
}
