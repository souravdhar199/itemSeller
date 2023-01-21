import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [showPass, SetShowpass] = new useState(false);
  const [dataForm, setDataform] = new useState({ email: "", pass: "" });
  const { email, pass } = dataForm;
  const navigate = useNavigate();
  return (
    <div>
      <div></div>
    </div>
  );
}

export default Signin;
