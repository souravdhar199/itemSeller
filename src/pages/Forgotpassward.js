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
      <div className="login-box">
        <form onSubmit={submit}>
          <div className="user-box">
            <label>Enter your Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <button>Send Reset Link</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Forgotpassward;
