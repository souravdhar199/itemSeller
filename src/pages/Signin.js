import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [showPass, SetShowpass] = new useState(false);
  const [dataForm, setDataform] = new useState({ email: "", pass: "" });
  const { email, pass } = dataForm;
  const navigate = useNavigate();
  return (
    <>
      <div>
        <header>
          <p>Hi, welcome!</p>
        </header>
        <form>
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
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </>
  );
}

export default Signin;
