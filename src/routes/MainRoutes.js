import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "./../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AuthGuard from "./../utils/route-guard/AuthGuard";

// app routing
const SelectCompany = Loadable(
  lazy(() => import("../views/company/select-company"))
);
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route path={["/sample-page", "/select-company"]}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <Route path="/select-company" component={SelectCompany} />
            <Route path="/sample-page" component={SamplePage} />
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
