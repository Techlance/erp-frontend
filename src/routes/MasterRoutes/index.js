import React from "react";
import { Route } from "react-router-dom";

// routes
import LedgerRoutes from "./LedgerRoutes";
import CurrencyRoutes from "./CurrencyRoutes";

//-----------------------|| ROUTING RENDER ||-----------------------//

const MasterRoutes = () => {
  return (
    <Route path={["/company/:mid/master/*"]}>
      <React.Fragment>
        {/* Routes for Master Ledger */}
        <Route
          path="/company/:mid/master/ledger-master"
          component={LedgerRoutes}
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
