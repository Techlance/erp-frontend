import React from "react";
import { Route } from "react-router-dom";

// routes
import PurchaseRoutes from "./PurchaseRoutes";

//-----------------------|| ROUTING RENDER ||-----------------------//

const TransactionRoutes = () => {
  return (
    <Route path={["/company/:mid/:year_id/transactions/*"]}>
      <React.Fragment>
        {/* Routes for Transaction Ledger */}
        <Route
          path="/company/:mid/:year_id/transactions/purchase"
          component={PurchaseRoutes}
        />
      </React.Fragment>
    </Route>
  );
};

export default TransactionRoutes;
