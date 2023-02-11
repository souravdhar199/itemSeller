import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/signin&signup.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Signin() {
  // const [showPass, SetShowpass] = new useState(false);
  const [dataForm, setDataform] = new useState({ email: "", pass: "" });
  const { email, pass } = dataForm;
  const navigate = useNavigate();

  //this will run seperately
  const onSubmit = async (e) => {
    e.preventDefault();

    // Now lookup email and pass in firebase
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="login-box">
        <form className="formUpdatess" onSubmit={onSubmit}>
          <div className="user-box">
            <h1>Hi Welcome!</h1>
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setDataform((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
            <p>Passward</p>
            <input
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
          <button className="buttonSignin">Sign IN</button>
          <br />
          <button
            className="buttonSignin"
            onClick={() => navigate("/forgot-passward")}
          >
            {" "}
            Forgot Passward
          </button>
          <br />
          <button className="buttonSignin" onClick={() => navigate("/sign-up")}>
            {" "}
            Sign-Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signin;
