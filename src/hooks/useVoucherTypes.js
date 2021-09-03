import { useContext } from "react";

// voucher type provider
import { VoucherTypesContext } from "../contexts/master/VoucherTypesContext";

//-----------------------|| Voucher Types Hooks ||-----------------------//

const useVoucherTypes = () => useContext(VoucherTypesContext);

export default useVoucherTypes;
