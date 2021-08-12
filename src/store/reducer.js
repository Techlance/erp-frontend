import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import snackbarReducer from "./snackbarReducer";
import companyReducer from "./companyReducer";
import userPermissionsReducer from "./userManagementReducer";
import ledgerMasterReducer from "./master/ledgerMasterReducer";

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
  customization: customizationReducer,
  snackbar: snackbarReducer,
  company: companyReducer,
  userPermissions: userPermissionsReducer,
  ledgerMaster: ledgerMasterReducer
});

export default reducer;
