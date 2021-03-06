import { combineReducers } from "redux";

import * as reducers from "./reducers";

//-----------------------|| COMBINE REDUCERS ||-----------------------//

const reducer = combineReducers({
  customization: reducers.customizationReducer,
  snackbar: reducers.snackbarReducer,
  company: reducers.companyReducer,
  companyMaster: reducers.companyMasterReducer,
  userPermissions: reducers.userPermissionsReducer,
  ledgerMaster: reducers.ledgerMasterReducer,
  costCenter: reducers.costCenterReducer,
  lc: reducers.lcReducer,
  voucherTypes: reducers.voucherTypesReducer,
  brs: reducers.brsReducer,
  budget: reducers.budgetReducer,
  purchase: reducers.PurchaseReducer
});

export default reducer;
