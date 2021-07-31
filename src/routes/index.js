import React from "react";
import { Redirect, Switch } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import CompanyRoutes from "./ComapanyRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import UserManagerRoutes from './UserManagerRoutes'

// project imports
import config from "./../config";

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={config.defaultPath} />
      <React.Fragment>
        {/* Routes for authentication pages */}
        <AuthenticationRoutes />

        {/* Route for login */}
        <LoginRoutes />

        {/* Routes for Company master */}
        <CompanyRoutes />

        {/* Routes for User Manager */}
        <UserManagerRoutes />

        {/* Routes for main layouts */}
        <MainRoutes />
      </React.Fragment>
    </Switch>
  );
};

export default Routes;
