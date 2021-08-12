import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import CompanyGuard from "../../utils/route-guard/CompanyGuard";

// company page routing
const AccountHead = Loadable(
  lazy(() => import("../../views/master/ledger-master/account-head"))
);

const routes = [
  {
    url: "/head",
    component: AccountHead,
  },
];

//-----------------------|| Companies Routing ||-----------------------//
const CompanyRoutes = ({ match }) => {
  const location = useLocation();

  return (
    <Route path={routes.map(({ url }) => `${match.path}${url}`)}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <CompanyGuard>
            {routes.map(({ url, component }) => (
              <Route path={`${match.path}${url}`} component={component} />
            ))}
          </CompanyGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default CompanyRoutes;
