import React, { lazy } from "react";
import { Redirect, Route } from "react-router-dom";

// project imports
import Loadable from "../ui-component/Loadable";

// routes
const CompanyRoutes = Loadable(lazy(() => import("./CompanyRoutes")));
const UserManagerRoutes = Loadable(lazy(() => import("./UserManagerRoutes")));

const AdminRoutes = () => {
  console.log("in AdminRoutes.js");

  return (
    <Route path={["/admin/*"]}>
      <React.Fragment>
        {/* <Redirect exact from="/admin" to="/admin/companies" /> */}
        {/* Routes for Company master */}
        <CompanyRoutes />

        {/* Routes for User Manager */}
        <UserManagerRoutes />
      </React.Fragment>
    </Route>
  );
};

export default AdminRoutes;
