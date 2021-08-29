import { useContext } from "react";

// ledger master provider
import { LedgerMaster } from "../contexts/master/LedgerMasterContext";

//-----------------------|| Ledger Master Hooks ||-----------------------//

const useLedgerMaster = () => useContext(LedgerMaster);

export default useLedgerMaster;
