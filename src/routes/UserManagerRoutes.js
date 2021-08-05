import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

// company page routing
const UserGroups = Loadable(
  lazy(() => import("../views/pages/user-management/user-groups"))
);
const UserRights = Loadable(
  lazy(() => import("../views/pages/user-management/user-rights"))
);
const Users = Loadable(
  lazy(() => import("../views/pages/user-management/users"))
);

//-----------------------|| MAIN ROUTING ||-----------------------//
const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route
      path={[
        "/user-manager/groups",
        "/user-manager/rights",
        "/user-manager/users",
      ]}
    >
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <Route path="/user-manager/groups" component={UserGroups} />
          <Route path="/user-manager/rights" component={UserRights} />
          <Route path="/user-manager/users" component={Users} />
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
