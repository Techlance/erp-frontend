import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import AuthGuard from "../../utils/route-guard/AuthGuard";

// cost center (sub menu) page routing
const Center = Loadable(
  lazy(() => import("../../views/master/cost-center/cost-center-sub-menu"))
);

//-----------------------|| Companies Routing ||-----------------------//
const CenterRoutes = ({ match }) => {
  const location = useLocation();

  let routes = [
    {
      url: "/center",
      component: Center,
    },
  ];
  return (
    <Route path={routes.map((route) => `${match.path}${route.url}`)}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            {routes.map((route) => (
              <Route
                path={`${match.path}${route.url}`}
                component={route.component}
              />
            ))}
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default CenterRoutes;
