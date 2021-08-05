import React from "react";
import { Redirect, Switch } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";

// project imports
import config from "./../config";
import AuthGuard from "../utils/route-guard/AuthGuard";
import AdminRoutes from "./AdminRoutes";

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
  console.log("in index.js");

  return (
    <Switch>
      <Redirect exact from="/" to={config.defaultPath} />
      <React.Fragment>
        {/* Routes for authentication pages */}
        <AuthenticationRoutes />

        {/* Route for login */}
        <LoginRoutes />

        {/* Routes for main layouts */}
        <MainRoutes />

        {/* Admin Routes */}
        <AdminRoutes />
      </React.Fragment>
    </Switch>
  );
};

export default Routes;
