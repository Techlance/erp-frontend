import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import snackbarReducer from "./snackbarReducer";
import companyReducer from "./companyReducer";

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
  customization: customizationReducer,
  snackbar: snackbarReducer,
  company: companyReducer,
});

export default reducer;
