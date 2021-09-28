import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import CompanyGuard from "../../utils/route-guard/CompanyGuard";

// company page routing
const CreditPurchase = Loadable(
  lazy(() => import("../../views/transaction/purchase/credit-purchase"))
);

const routes = [
  {
    url: "/credit/",
    component: CreditPurchase,
  },
];

//-----------------------|| Purchase Routing ||-----------------------//
const PurchaseRoutes = ({ match }) => {
  const location = useLocation();

  return (
    <Route path={routes.map(({ url }) => `${match.path}${url}`)}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <CompanyGuard>
            <Switch location={location} key={location.pathname}>
              {routes.map(({ url, component }) => (
                <Route path={`${match.path}${url}`} component={component} />
              ))}
            </Switch>
          </CompanyGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default PurchaseRoutes;
