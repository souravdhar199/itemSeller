import React, { useState } from "react";
import "../CSS/signin&signup.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebaseconfig.js";
import { toast } from "react-toastify";

function Signup() {
  const [showPass, SetShowpass] = new useState(false);
  const [dataForm, setDataform] = new useState({
    name: " ",
    email: "",
    pass: "",
  });
  const { name, email, pass } = dataForm;
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(); // getinng auth value

      //registering the user which return a promise
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );

      //then we will get the promise data
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // this code will store data in firestore
      const formData = { ...dataForm };
      delete formData.pass; // this will delete the hook value
      formData.timeStamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formData);

      navigate("/sign-in");
    } catch {
      console.log("Error");
      toast("Passward/email not strong/valid");
    }
  };
  return (
    <>
      <div className="login-box">
        <form className="formUpdatess" onSubmit={onSubmit}>
          <div className="user-box">
            <h1>Hi, welcome!</h1>
            <p>Full name </p>
            <input
              type="name"
              value={name}
              onChange={(e) =>
                setDataform((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
            <br></br>
            <p> Email </p>
            <input
              type="email"
              s
              value={email}
              onChange={(e) =>
                setDataform((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
            <p> Passward </p>
            <input
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) =>
                setDataform((prevState) => ({
                  ...prevState,
                  pass: e.target.value,
                }))
              }
            />
            <br />
            {/* <button
              className="buttonSignin"
              onClick={(e) => [e.preventDefault(), SetShowpass(!showPass)]}
            >
              {showPass ? "Hide Pass" : "Show Pass"}
            </button> */}
          </div>
          <button className="buttonSignin">Sign Up</button>
          <br></br>

          <button className="buttonSignin" onClick={() => navigate("/sign-in")}>
            Sign-In
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
