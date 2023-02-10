import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/signin&signup.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import useAuthStatus from "../hooks/useAuthStatus";

function Signin() {
  const [showPass, SetShowpass] = new useState(false);
  const [dataForm, setDataform] = new useState({ email: "", pass: "" });
  const { email, pass } = dataForm;
  const navigate = useNavigate();
  const { loggedIN } = useAuthStatus();

  useEffect(() => {
    if (!loggedIN) {
      toast.error("not logged in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        toast("Wrong user Authentication");
      });
  };
  return (
    <>
      <div className="login-box">
        <header>
          <h1>Hi Welcome! </h1>
        </header>
        <form onSubmit={onSubmit}>
          <div className="user-box">
            <label>Email</label>
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
            <label>Passward</label>
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
          <button>Sign IN</button>
          <Link to="/forgot-passward">Forgot passward</Link>
          <Link to="/sign-up">Sign Up</Link>
        </form>
      </div>
    </>
  );
}

export default Signin;
