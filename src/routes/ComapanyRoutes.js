import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AuthGuard from "../utils/route-guard/AuthGuard";

// company page routing
const SelectCompany = Loadable(
  lazy(() => import("../views/pages/company/select-company"))
);
const CompanyDetails = Loadable(
  lazy(() => import("../views/pages/company/company-details"))
);

//-----------------------|| MAIN ROUTING ||-----------------------//
const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/company-details", "/select-company"]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <Route path="/select-company" component={SelectCompany} />
            <Route path="/company-details" component={CompanyDetails} />
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
