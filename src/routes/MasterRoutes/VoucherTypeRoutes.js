import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import CompanyGuard from "../../utils/route-guard/CompanyGuard";

// company page routing
const VoucherTypeMaster = Loadable(
  lazy(() => import("../../views/master/voucher-type"))
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
              <Route path={match.path} component={VoucherTypeMaster} />
            </Switch>
          </CompanyGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default CompanyRoutes;
