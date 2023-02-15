import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function Forgotpassward() {
  const [emails, setEmail] = new useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, emails);
      toast.success("Email Sent!");
    } catch (error) {
      console.log(error);
      toast.error("Opps! something went wrong");
    }
  };
  return (
    <>
      {" "}
      <div className="addList">
        <form onSubmit={submit}>
          <div className="forgetPass">
            <p>Enter your Email </p>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <br></br>
            <button className="buttonSignin">Send Reset Link</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Forgotpassward;
