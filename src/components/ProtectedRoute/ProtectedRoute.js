import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {

  let igHasToken = props.isLoggedIn || localStorage.getItem("token");  
 
  return (
    <Route>
      {() =>
        igHasToken ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect to="./" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
