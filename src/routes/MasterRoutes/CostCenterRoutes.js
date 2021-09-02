import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import AuthGuard from "../../utils/route-guard/AuthGuard";
import CostCategoryDetails from "../../views/master/cost-center/cost-category-details";
import CompanyGuard from "../../utils/route-guard/CompanyGuard";
import CostCenterDetails from "../../views/master/cost-center/cost-center-details";

// cost category page routing
const CostCenter = Loadable(
  lazy(() => import("../../views/master/cost-center/cost-category"))
);
const Center = Loadable(
  lazy(() => import("../../views/master/cost-center/cost-center-sub-menu"))
);

//-----------------------|| Companies Routing ||-----------------------//
const CostCenterRoutes = ({ match }) => {
  const location = useLocation();

  let routes = [
    {
      url: "/category/:cat_id",
      component: CostCategoryDetails,
    },
    {
      url: "/center/:cen_id",
      component: CostCenterDetails,
    },

    {
      url: "/category",
      component: CostCenter,
    },
    {
      url: "/center",
      component: Center,
    },
  ];
  return (
    <Route path={routes.map((route) => `${match.path}${route.url}`)}>
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          <AuthGuard>
            <CompanyGuard>
              <Switch location={location} key={location.pathname}>
                {routes.map((route) => (
                  <Route
                    path={`${match.path}${route.url}`}
                    component={route.component}
                  />
                ))}
              </Switch>
            </CompanyGuard>
          </AuthGuard>
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default CostCenterRoutes;
