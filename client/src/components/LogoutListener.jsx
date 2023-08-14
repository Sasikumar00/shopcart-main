// LogoutListener component
import React, { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { logoutChannel } from "../utils/createLogoutChannel";

function LogoutListener() {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const handleLogoutMessage = (event) => {
      if (event.data.type === "logout") {
        setAuth({
          //We use the spread operator because we don't want to affect the already existing data in the auth state object.
          //We just want to update the required field
          ...auth,
          user: null,
          token: ""
        })
        window.location.reload()
      }
    };

    // Set up the listener for logout messages
    logoutChannel.onmessage = handleLogoutMessage;

    // Clean up the listener when the component unmounts
    return () => {
      logoutChannel.onmessage = null;
    };
  }, []);

  return null;
}

export default LogoutListener;
