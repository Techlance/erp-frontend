import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import CompanyGuard from "../../utils/route-guard/CompanyGuard";

// company page routing
const CurrencyMaster = Loadable(
  lazy(() => import("../../views/master/currency"))
);

//-----------------------|| Currency Routing ||-----------------------//

const CompanyRoutes = ({ match }) => {
  const location = useLocation();

  return (
    <Route path={[`${match.path}`]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <CompanyGuard>
            <Switch location={location} key={location.pathname}>
              <Route path={match.path} component={CurrencyMaster} />
            </Switch>
          </CompanyGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default CompanyRoutes;
