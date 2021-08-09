import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AdminGuard from "../utils/route-guard/AdminGuard";
import UserDetails from "../views/user-management/users/user-details";

// company page routing
const UserGroups = Loadable(
  lazy(() => import("../views/user-management/user-groups"))
);
const UserRights = Loadable(
  lazy(() => import("../views/user-management/user-rights"))
);

const UserList = Loadable(
  lazy(() => import("../views/user-management/users/user-list"))
);

//-----------------------|| MAIN ROUTING ||-----------------------//
const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route
      path={[
        "/admin/user-manager/groups",
        "/admin/user-manager/rights",
        "/admin/user-manager/users",
        "/admin/user-manager/users/:uid",
      ]}
    >
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AdminGuard>
            <Route path="/admin/user-manager/groups" component={UserGroups} />
            <Route path="/admin/user-manager/rights" component={UserRights} />
            <Switch location={location} key={location.pathname}>
              <AdminGuard>
                <Route
                  path="/admin/user-manager/users/:uid"
                  component={UserDetails}
                />
                <Route
                  exact
                  path="/admin/user-manager/users"
                  component={UserList}
                />
              </AdminGuard>
            </Switch>
          </AdminGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
