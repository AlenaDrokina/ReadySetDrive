import React from "react";
import { Navigate } from "react-router-dom";
import Local from "../helpers/Local";

function PrivateRoute(props) {
  // Redirect to /login if anonymous user
  let user_id = Local.getUser_id();
  if (!user_id) {
    return <Navigate to="/login" />;
  }

  // Render child component(s)
  return <>{props.children}</>;
}

export default PrivateRoute;
