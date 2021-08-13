import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";

// routes
import LedgerRoutes from "./LedgerRoutes";
// project imports
// import config from "../../config";
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
      </React.Fragment>
    </Route>
  );
};

export default MasterRoutes;
