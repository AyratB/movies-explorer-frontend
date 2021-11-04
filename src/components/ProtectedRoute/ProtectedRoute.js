import React from "react";
import { Route, Redirect } from "react-router-dom";
import Main from "./../Main/Main.js";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? (
          <>
            <Component {...props} />            
          </>
        ) : (
          <Redirect to="./main" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
