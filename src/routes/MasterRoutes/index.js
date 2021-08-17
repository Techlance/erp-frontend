import React from "react";
import { Route } from "react-router-dom";

// routes
import LedgerRoutes from "./LedgerRoutes";
import CurrencyRoutes from "./CurrencyRoutes";
import VoucherTypeRoutes from "./VoucherTypeRoutes";

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

        {/* Routes for Voucher Types */}
        <Route
          path="/company/:mid/master/voucher-type"
          component={VoucherTypeRoutes}
        />
      </React.Fragment>
    </Route>
  );
};

export default MasterRoutes;
