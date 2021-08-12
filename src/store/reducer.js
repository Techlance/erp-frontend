import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import snackbarReducer from "./snackbarReducer";
import companyReducer from "./companyReducer";
import userPermissionsReducer from "./userManagementReducer";
import ledgerMasterReducer from "./master/ledgerMasterReducer";
import costCenterReducer from "./cost-center/costCenterReducer";

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
  customization: customizationReducer,
  snackbar: snackbarReducer,
  company: companyReducer,
  userPermissions: userPermissionsReducer,
  ledgerMaster: ledgerMasterReducer,
  costCenter: costCenterReducer,
});

export default reducer;
