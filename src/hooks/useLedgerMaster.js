import { useContext } from "react";

// ledger master provider
import { LedgerMasterContext } from "../contexts/master/LedgerMasterContext";

//-----------------------|| Ledger Master Hooks ||-----------------------//

const useLedgerMaster = () => useContext(LedgerMasterContext);

export default useLedgerMaster;
