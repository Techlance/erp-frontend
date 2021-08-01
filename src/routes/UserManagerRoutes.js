import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AuthGuard from "../utils/route-guard/AuthGuard";

// company page routing
const UserGroups = Loadable(
    lazy(()=> import("../views/pages/userManagement/UserGroups"))
)
const UserRights = Loadable(
    lazy(()=> import("../views/pages/userManagement/UserRights"))
)
const Users = Loadable(
    lazy(()=> import("../views/pages/userManagement/Users"))
)

//-----------------------|| MAIN ROUTING ||-----------------------//
const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/user-manager/users", "/user-manager/groups","/user-manager/rights"]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <Route path="/user-manager/users" component={Users} />
            <Route path="/user-manager/groups" component={UserGroups} />
            <Route path="/user-manager/rights" component={UserRights} />
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;