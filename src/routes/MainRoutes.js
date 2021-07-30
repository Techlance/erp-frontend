import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "./../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AuthGuard from "./../utils/route-guard/AuthGuard";
import CompanyDetails from '../views/pages/CompanyDetails/CompanyDetails'

// sample page routing
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/sample-page","/company-details"]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <Route path="/sample-page" component={SamplePage} />
            <Route path="/company-details" component={CompanyDetails} />
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
