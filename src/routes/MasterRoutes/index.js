import React from "react";
import { Route } from "react-router-dom";

// routes
import LedgerRoutes from "./LedgerRoutes";
import CurrencyRoutes from "./CurrencyRoutes";
import CostCenterRoutes from "./CostCenterRoutes";

//-----------------------|| ROUTING RENDER ||-----------------------//

const MasterRoutes = () => {
  return (
    <Route path={["/company/:mid/master/*"]}>
      <React.Fragment>
        {/* Routes for Master Ledger */}
        {/* <Route path="/master/ledger-master" component={LedgerRoutes} /> */}
        {/* <Route path="/master/cost-center" component={CostCenterRoutes} /> */}
        <Route
          path="/company/:mid/master/ledger-master"
          component={LedgerRoutes}
        />
        <Route
          path="/company/:mid/master/cost-center"
          component={CostCenterRoutes}
        />

        {/* Routes for Currency */}
        <Route
          path="/company/:mid/master/currency"
          component={CurrencyRoutes}
        />
      </React.Fragment>
    </Route>
  );
};

export default MasterRoutes;
