import React from "react";
import { Route } from "react-router-dom";

// routes
import LedgerRoutes from "./LedgerRoutes";
import CurrencyRoutes from "./CurrencyRoutes";
import CostCenterRoutes from "./CostCenterRoutes";
import LcRoutes from "./lcRoutes";
import VoucherTypeRoutes from "./VoucherTypeRoutes";
import BrsRoutes from "./brsRoutes";
import BudgetRoutes from "./budgetRoutes";

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

        <Route path="/company/:mid/master/lc" component={LcRoutes} />

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

        {/* Routes for BRS */}
        <Route path="/company/:mid/master/op-bal-brs" component={BrsRoutes} />

        {/* Routes for Budget */}
        <Route path="/company/:mid/master/budget" component={BudgetRoutes} />
      </React.Fragment>
    </Route>
  );
};

export default MasterRoutes;
