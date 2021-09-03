import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import AuthGuard from "../../utils/route-guard/AuthGuard";
import CompanyGuard from "../../utils/route-guard/CompanyGuard";
import LcDetails from "../../views/master/LC/import-details";

// lc page routing

const lc = Loadable(lazy(() => import("../../views/master/LC/import")));

//-----------------------|| LC Routing ||-----------------------//
const LcRoutes = ({ match }) => {
  const location = useLocation();

  let routes = [
    {
      url: "/import/:lc_id",
      component: LcDetails,
    },
    {
      url: "/export/:lc_id",
      component: LcDetails,
    },

    {
      url: "/import",
      component: lc,
    },
    {
      url: "/export",
      component: lc,
    },
  ];
  return (
    <Route path={routes.map((route) => `${match.path}${route.url}`)}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <CompanyGuard>
              <Switch location={location} key={location.pathname}>
                {routes.map((route) => (
                  <Route
                    path={`${match.path}${route.url}`}
                    component={route.component}
                  />
                ))}
              </Switch>
            </CompanyGuard>
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default LcRoutes;
