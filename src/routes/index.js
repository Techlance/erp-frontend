import React from "react";
import { Redirect, Switch } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import AdminRoutes from "./AdminRoutes";
import MasterRoutes from "./MasterRoutes";

// project imports
import config from "./../config";

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={config.defaultPath} />
      <React.Fragment>
        {/* Routes for main layouts */}
        <MainRoutes />

        {/* Admin Routes */}
        <AdminRoutes />

        {/* Route for login */}
        <LoginRoutes />

        {/* Route for Master */}
        <MasterRoutes />

      </React.Fragment>
    </Switch>
  );
};

export default Routes;
