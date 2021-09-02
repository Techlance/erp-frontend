import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MainLayout from "../../layout/MainLayout";
import Loadable from "../../ui-component/Loadable";
import CompanyGuard from "../../utils/route-guard/CompanyGuard";

// company page routing
const AccountHead = Loadable(
  lazy(() => import("../../views/master/ledger-master/account-head"))
);
const AccountHeadDetails = Loadable(
  lazy(() =>
    import(
      "../../views/master/ledger-master/account-head/AccountHeadDetails.js"
    )
  )
);
const AccountGroup = Loadable(
  lazy(() => import("../../views/master/ledger-master/account-group/"))
);
const Ledger = Loadable(
  lazy(() => import("../../views/master/ledger-master/ledger/"))
);
const LedgerDetails = Loadable(
  lazy(() => import("../../views/master/ledger-master/ledger/LedgerDetails"))
);
const AccountGroupDetails = Loadable(
  lazy(() =>
    import(
      "../../views/master/ledger-master/account-group/AccountGroupDetails.js"
    )
  )
);

const routes = [
  {
    url: "/head/:aid",
    component: AccountHeadDetails,
  },
  {
    url: "/head",
    component: AccountHead,
  },
  {
    url: "/group/:gid",
    component: AccountGroupDetails,
  },
  {
    url: "/group",
    component: AccountGroup,
  },
  {
    url: "/ledger/:lid",
    component: LedgerDetails,
  },
  {
    url: "/ledger",
    component: Ledger,
  },
];

//-----------------------|| Companies Routing ||-----------------------//
const CompanyRoutes = ({ match }) => {
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

export default CompanyRoutes;
