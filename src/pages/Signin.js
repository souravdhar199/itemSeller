import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/signin&signup.css";

function Signin() {
  const [showPass, SetShowpass] = new useState(false);
  const [dataForm, setDataform] = new useState({ email: "", pass: "" });
  const { email, pass } = dataForm;
  const navigate = useNavigate();
  return (
    <>
      <div className="login-box">
        <header>
          <h1>Hi Welcome! </h1>
        </header>
        <form>
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
