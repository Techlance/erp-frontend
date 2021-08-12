import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import AuthGuard from "../../utils/route-guard/AuthGuard";

// company page routing
const AccountHead = Loadable(
  lazy(() => import("../../views/master/ledger-master/account-head"))
);

//-----------------------|| Companies Routing ||-----------------------//
const CompanyRoutes = ({match}) => {
  const location = useLocation();

  let routes = [
      {
          url:'/head',
          component:AccountHead
      }
  ]
  return (
    <Route path={routes.map(route=>`${match.path}${route.url}`)}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
            <AuthGuard>
                {routes.map(route => <Route path={`${match.path}${route.url}`} component={route.component} />)}
            </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default CompanyRoutes;
