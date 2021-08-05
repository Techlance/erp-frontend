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
const CompanyDetailsOld = Loadable(
  lazy(() => import("../views/pages/company/company-details-old"))
);
const CompanyDetails = Loadable(
  lazy(() => import("../views/pages/company/company-details"))
);
const CompanyList = Loadable(
  lazy(() => import("../views/pages/company/CompanyList"))
);

//-----------------------|| MAIN ROUTING ||-----------------------//
const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/company-details", "/select-company","/companies"]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <Route path="/select-company" component={SelectCompany} />
            <Route path="/company-details-old" component={CompanyDetailsOld} />
            <Switch>
              <Route path="/companies/:cid" component={CompanyDetails} />
              <Route path="/companies" component={CompanyList} />
            </Switch>
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
