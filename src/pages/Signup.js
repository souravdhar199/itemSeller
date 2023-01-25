import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { db } from "../firebaseconfig.js";

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
      console.log(user);

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      navigate("/profile");
    } catch {
      console.log("Error");
    }
  };
  return (
    <>
      <div>
        <header>
          <p>Hi, welcome!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="name"
            placeholder="What is your name"
            value={name}
            onChange={(e) =>
              setDataform((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <br></br>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) =>
              setDataform((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          <div>
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
            <button
              onClick={(e) => [e.preventDefault(), SetShowpass(!showPass)]}
            >
              {showPass ? "Hide Pass" : "Show Pass"}
            </button>
          </div>
          <Link to="/forgot-passward">Forgot passward</Link>
          <button>Sign In</button>
        </form>
        <Link to="/sign-in">Sign In</Link>
      </div>
    </>
  );
}

export default Signup;
