import React from "react";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
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

  return (
    <div>
      <h1>Wlcome, {loggedUser.name}</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
