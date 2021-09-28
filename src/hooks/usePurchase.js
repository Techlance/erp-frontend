import { useContext } from "react";

// ledger master provider
import { PurchaseContext } from "../contexts/transaction/PurchaseContext";

//-----------------------|| Ledger Master Hooks ||-----------------------//

const usePurchase = () => useContext(PurchaseContext);

export default usePurchase;
