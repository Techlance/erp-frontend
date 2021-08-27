import { useContext } from "react";

// user management provider
import { VoucherTypesContext } from "../contexts/master/VoucherTypesContext";

//-----------------------|| USER MANAGEMENT HOOKS ||-----------------------//

const useVoucherTypes = () => useContext(VoucherTypesContext);

export default useVoucherTypes;
