import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function useAuthStatus() {
  const [loggedIN, setloggedIN] = useState(false);
  const [check, setCheck] = useState(true);
  const [Uid, setUid] = useState("");
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setloggedIN(true);
      }

      setCheck(false);
    });
  });
  return { loggedIN, check, Uid };
}
export default useAuthStatus;
