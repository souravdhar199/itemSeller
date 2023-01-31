import React from "react";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Profile() {
  const [loggedUser, setLogged] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    setLogged(auth.currentUser);
  }, [auth.currentUser]);
  return loggedUser ? (
    <h1>Welcome, {loggedUser.displayName}</h1>
  ) : (
    <h1>Not logged in</h1>
  );
}
