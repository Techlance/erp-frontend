import React from "react";
import { Route } from "react-router-dom";

// routes
import LedgerRoutes from "./LedgerRoutes";

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
      </React.Fragment>
    </Route>
  );
};

export default MasterRoutes;
