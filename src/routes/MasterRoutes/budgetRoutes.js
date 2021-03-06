import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import CompanyGuard from "../../utils/route-guard/CompanyGuard";

// company page routing
const BudgetList = Loadable(lazy(() => import("../../views/master/budget")));
const BudgetPLDetails = Loadable(
  lazy(() => import("../../views/master/budget/pl-budget/PLBudgetDetails"))
);
const CashFlowDetails = Loadable(
  lazy(() => import("../../views/master/budget/cash-flow/CashFlowDetails"))
);

const routes = [
  {
    url: "/pl/:bid",
    component: BudgetPLDetails,
  },
  {
    url: "/cashflow/:bid",
    component: CashFlowDetails,
  },
  {
    url: "",
    component: BudgetList,
  },
];

//-----------------------|| Budget Routing ||-----------------------//
const BudgetRoutes = ({ match }) => {
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

export default BudgetRoutes;
