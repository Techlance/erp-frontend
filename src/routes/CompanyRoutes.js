import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AdminGuard from "../utils/route-guard/AdminGuard";

// company page routing
const CompanyDetails = Loadable(
  lazy(() => import("../views/company/company-details"))
);
const CompanyList = Loadable(
  lazy(() => import("../views/company/company-list"))
);

//-----------------------|| Companies Routing ||-----------------------//
const CompanyRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/admin/companies/:cid", "/admin/companies"]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AdminGuard>
            <Route path="/admin/companies/:cid" component={CompanyDetails} />
            <Route exact path="/admin/companies" component={CompanyList} />
          </AdminGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default CompanyRoutes;
