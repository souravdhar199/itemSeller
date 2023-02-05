import React from "react";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function useAuthStatus() {
  const [loggedIN, setloggedIN] = useState(false);
  const [check, setCheck] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        setloggedIN(true);
      }

      setCheck(false);
    });
  });
  return { loggedIN, check };
}
export default useAuthStatus;
