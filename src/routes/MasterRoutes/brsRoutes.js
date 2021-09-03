import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import CompanyGuard from "../../utils/route-guard/CompanyGuard";

// BRS page routing
const BrsMaster = Loadable(lazy(() => import("../../views/master/brs")));
const BrsDetails = Loadable(
  lazy(() => import("../../views/master/brs/BrsDetails"))
);

const BrsRoutes = ({ match }) => {
  const location = useLocation();

  return (
    <Route path={[`${match.path}`, `${match.path}/:brs_id`]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <CompanyGuard>
            <Switch location={location} key={location.pathname}>
              <Route
                path={`${match.path}/:brs_id`}
                exact
                component={BrsDetails}
              />
              <Route path={match.path} component={BrsMaster} />
            </Switch>
          </CompanyGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default BrsRoutes;
